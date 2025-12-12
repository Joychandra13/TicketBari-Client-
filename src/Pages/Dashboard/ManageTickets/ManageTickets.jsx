import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import { FiCheck, FiX } from "react-icons/fi";

const ManageTickets = () => {
  const axiosSecure = useAxios();
  const [localStatus, setLocalStatus] = useState({}); // to track status per ticket

  // Fetch all pending tickets
  const { data: tickets = [], refetch, isLoading } = useQuery({
    queryKey: ["pendingTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets?status=pending");
      return res.data;
    },
  });

  const handleStatusChange = async (ticketId, status) => {
    try {
      await axiosSecure.put(`/tickets/${ticketId}`, { status });
      Swal.fire("Success", `Ticket ${status}!`, "success");

      // Update local status to show badge immediately
      setLocalStatus((prev) => ({ ...prev, [ticketId]: status }));

      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not update ticket status", "error");
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (!tickets.length)
    return <p className="text-center py-10">No pending tickets</p>;

  return (
    <div className="max-w-7xl mx-auto pt-20 pb-10 px-6">
      <h1 className="title text-center">Manage Tickets</h1>
      <p className="subTitle text-center mb-6">
        Approve or reject tickets added by vendors.
      </p>

      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full dark:bg-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Vendor</th>
              <th>Title</th>
              <th>From → To</th>
              <th>Transport</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => {
              const status = localStatus[ticket._id] || ticket.status;

              return (
                <tr key={ticket._id}>
                  <th>{index + 1}</th>
                  <td>{ticket.vendorName || ticket.vendorEmail}</td>
                  <td>{ticket.title}</td>
                  <td>
                    {ticket.from} → {ticket.to}
                  </td>
                  <td>{ticket.transport}</td>
                  <td>BDT {ticket.price}</td>
                  <td>{ticket.quantity}</td>
                  <td className="flex gap-2">
                    {status === "pending" ? (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(ticket._id, "approved")
                          }
                          className="btn btn-success btn-sm p-2 flex items-center justify-center"
                          title="Approve Ticket"
                        >
                          <FiCheck size={18} />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(ticket._id, "rejected")
                          }
                          className="btn btn-error btn-sm p-2 flex items-center justify-center"
                          title="Reject Ticket"
                        >
                          <FiX size={18} />
                        </button>
                      </>
                    ) : (
                      <span
                        className={`font-semibold px-3 py-1 rounded ${
                          status === "approved"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTickets;
