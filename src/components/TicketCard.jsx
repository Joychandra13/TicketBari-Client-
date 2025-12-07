import React from "react";
import { Link } from "react-router";

const TicketCard = ({ ticket }) => {
  return (
    <div>
      <figure>
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-48 object-cover rounded-t-md"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-gray-400">{ticket.title}</h3>
        <div className="flex items-center gap-2 ">
          <p className="text-gray-400 text-center border border-gray-500">
            Price: BDT {ticket.price}
          </p>
          <p className="text-gray-400 text-center border border-gray-500">
            {" "}
            Quantity: {ticket.quantity} seats
          </p>
        </div>
        <p className="text-gray-400">Transport: {ticket.transport}</p>
        <p className="text-gray-400">Perks: {ticket.perks.join(", ")}</p>

        <div className="card-actions justify-end mt-3">
          <Link to={`/tickets/${ticket.id}`} className="fullWidthButton">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
