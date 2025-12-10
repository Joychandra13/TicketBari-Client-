import React from "react";

const MyAddedTicketsCard = ({ ticket, handleUpdate, handleDelete }) => {
  return (
    <div className="card rounded-md shadow-sm shadow-gray-400 hover:bg-gray-50 duration-300">
      <figure>
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-48 object-cover rounded-t-md"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-gray-400">{ticket.title}</h3>
        <p className="text-gray-500">
          From: {ticket.from} To: {ticket.to} , Transport: {ticket.transport}
        </p>

        <div className="flex gap-2">
            <p className="text-gray-500 border text-center border-gray-500 flex-1"> Price: BDT {ticket.price}</p>
            <p className="text-gray-500 border text-center border-gray-500 flex-1"> Quantity: {ticket.quantity}</p>

        </div>
        

        <div className="flex items-center justify-between gap-4">
        <p className="text-gray-500">
         Status:{" "}
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

        {/* Display perks */}
        {ticket.perks && ticket.perks.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {ticket.perks.map((perk, index) => (
              <span
                key={index}
                className="bg-gray-300 text-gray-500 text-xs font-semibold px-2 py-1 rounded-sm"
              >
                {perk}
              </span>
            ))}
          </div>
        )}
        </div>

        <div className="card-actions mt-3 flex gap-2">
          <button
            onClick={() => handleUpdate(ticket)}
            disabled={ticket.status === "rejected"}
            className={`button flex-1 ${
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
            className={`button flex-1 ${
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
  );
};

export default MyAddedTicketsCard;
