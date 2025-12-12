import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const AdvertiseTickets = () => {
  const axiosSecure = useAxios();

  // Fetch only approved tickets
  const { data: tickets = [], refetch, isLoading } = useQuery({
    queryKey: ["approvedTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/approved");
      return res.data;
    },
  });

  const handleAdvertise = async (ticket) => {
    // Count currently advertised tickets
    const advertisedCount = tickets.filter((t) => t.advertise).length;

    if (advertisedCount >= 6) {
      Swal.fire(
        "Limit Reached",
        "You cannot advertise more than 6 tickets at a time.",
        "warning"
      );
      return;
    }

    try {
      await axiosSecure.put(`/tickets/${ticket._id}`, { advertise: true });
      Swal.fire("Success", "Ticket Advertised!", "success");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not advertise ticket", "error");
    }
  };

  const handleUnadvertise = async (ticket) => {
    try {
      await axiosSecure.put(`/tickets/${ticket._id}`, { advertise: false });
      Swal.fire("Success", "Ticket Unadvertised!", "success");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not unadvertise ticket", "error");
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (!tickets.length)
    return <p className="text-center py-10">No approved tickets found.</p>;

  return (
    <div className="max-w-7xl mx-auto pt-20 pb-10 px-6">
      <h1 className="title text-center">Advertise Tickets</h1>
      <p className="subTitle text-center mb-6">
        Admin can advertise or unadvertise approved tickets. Max 6 tickets at a time.
      </p>

      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>From → To</th>
              <th>Transport</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <th>{index + 1}</th>
                <td>{ticket.title}</td>
                <td>{ticket.from} → {ticket.to}</td>
                <td>{ticket.transport}</td>
                <td>BDT {ticket.price}</td>
                <td>{ticket.quantity}</td>
                <td className="flex gap-2">
                  {/* Advertise Icon */}
                  <button
                    onClick={() => handleAdvertise(ticket)}
                    className= 'btn p-2 flex items-center justify-center text-white btn-success'
                    title="Advertise Ticket"
                    disabled={ticket.advertise}
                  >
                    <FiCheckCircle size={20} />
                  </button>

                  {/* Unadvertise Icon */}
                  <button
                    onClick={() => handleUnadvertise(ticket)}
                    className="btn btn-error p-2 flex items-center justify-center text-white"
                    title="Unadvertise Ticket"
                    disabled={!ticket.advertise}
                  >
                    <FiXCircle size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseTickets;
