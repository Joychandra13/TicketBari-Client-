import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const MyAddedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: tickets = [] } = useQuery({
    queryKey: ["myAddedTickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets?email=${user.email}`);
      return res.data;
    },
  });

  const handleUpdate = (ticketId) => {
    // Redirect to update page or open modal
    console.log("Update ticket", ticketId);
  };

  const handleDelete = (ticketId) => {
    // Call API to delete ticket
    console.log("Delete ticket", ticketId);
  };

  return (
    <div className="max-w-7xl mx-auto pt-20 pb-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="card rounded-md shadow-sm shadow-gray-400 hover:bg-gray-50 duration-300"
          >
            <figure>
              <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-48 object-cover rounded-t-md"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-gray-700">{ticket.title}</h3>
              <p className="text-gray-500">
                From: {ticket.from} → To: {ticket.to}
              </p>
              <p className="text-gray-500">Transport: {ticket.transport}</p>
              <p className="text-gray-500">Price: BDT {ticket.price}</p>
              <p className="text-gray-500">
                Quantity: {ticket.quantity} | Status:{" "}
                <span
                  className={`font-semibold ${
                    ticket.status === "approved"
                      ? "text-green-500"
                      : ticket.status === "rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {ticket.status}
                </span>
              </p>

              <div className="card-actions mt-3 flex gap-2">
                <button
                  onClick={() => handleUpdate(ticket._id)}
                  disabled={ticket.status === "rejected"}
                  className={` button  flex-1 ${
                    ticket.status === "rejected"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(ticket._id)}
                  disabled={ticket.status === "rejected"}
                  className={` button flex-1 ${
                    ticket.status === "rejected"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedTickets;
