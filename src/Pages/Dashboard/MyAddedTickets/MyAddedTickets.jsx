import { useQuery } from "@tanstack/react-query";
import React, { useState, useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import MyAddedTicketsCard from "../Shared/MyAddedTicketsCard";
import UpdateTicketModal from "../Shared/UpdateTicketModal";

const MyAddedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const modalRef = useRef();

  // Fetch my tickets
  const { data: tickets = [], refetch: refetchTickets } = useQuery({
    queryKey: ["myAddedTickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets?email=${user.email}`);
      return res.data;
    },
  });

  // Fetch all users (to check isFraud)
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Filter out tickets whose vendor is fraud
  const filteredTickets = tickets.filter((ticket) => {
    const vendor = users.find(u => u.email === ticket.vendorEmail);
    return !vendor?.isFraud;
  });

  // Open modal for updating a ticket
  const handleUpdate = (ticket) => {
    setSelectedTicket(ticket);
    modalRef.current?.openModal();
  };

  // Save updated ticket
  const handleUpdateSave = async (updatedTicket) => {
    try {
      const { _id, ...data } = updatedTicket; // remove _id from update payload
      const res = await axiosSecure.put(`/tickets/${_id}`, data);
      if (res.data.success) {
        Swal.fire("Updated!", "Ticket updated successfully!", "success");
        refetchTickets();
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  // Delete ticket
  const handleDelete = (ticketId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/tickets/${ticketId}`);
        if (res.data.deletedCount) {
          Swal.fire("Deleted!", "Ticket has been deleted!", "success");
          refetchTickets();
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto pt-20 pb-10 px-6">
      <h2 className="title text-center">My Added Tickets</h2>
      <p className="subTitle text-center mb-6">
        Manage tickets — update or delete anytime.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTickets.map((ticket) => (
          <MyAddedTicketsCard
            key={ticket._id}
            ticket={ticket}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
        {filteredTickets.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No tickets to display.
          </p>
        )}
      </div>

      <UpdateTicketModal
        ref={modalRef}
        ticket={selectedTicket}
        onSave={handleUpdateSave}
        onClose={() => setSelectedTicket(null)} // reset selected ticket on close
      />
    </div>
  );
};

export default MyAddedTickets;
