import React from "react";
import { Link } from "react-router";
import TicketCard from "../../../components/TicketCard";

const latestTickets = [
  {
    id: 7,
    title: "Dhaka to Comilla Bus",
    image: "https://ik.imagekit.io/joy1414/download%20(2).jpeg",
    price: 400,
    quantity: 45,
    transport: "Bus",
    perks: ["WiFi", "AC"],
  },
  {
    id: 8,
    title: "Dhaka to Rangpur Train",
    image: "https://ik.imagekit.io/joy1414/download%20(3).jpeg",
    price: 600,
    quantity: 100,
    transport: "Train",
    perks: ["AC", "Meals Included"],
  },
  {
    id: 9,
    title: "Dhaka to Bhola Launch",
    image: "https://ik.imagekit.io/joy1414/download%20(4).jpeg",
    price: 350,
    quantity: 50,
    transport: "Launch",
    perks: ["Refreshments", "Life Jackets"],
  },
  {
    id: 10,
    title: "Dhaka to Sylhet Flight",
    image: "https://ik.imagekit.io/joy1414/download%20(5).jpeg",
    price: 3600,
    quantity: 120,
    transport: "Plane",
    perks: ["Meal", "Baggage Included"],
  },
  {
    id: 11,
    title: "Dhaka to Pabna Bus",
    image: "https://ik.imagekit.io/joy1414/download%20(6).jpeg",
    price: 450,
    quantity: 60,
    transport: "Bus",
    perks: ["WiFi", "AC"],
  },
  {
    id: 12,
    title: "Dhaka to Tangail Train",
    image: "https://ik.imagekit.io/joy1414/download%20(7).jpeg",
    price: 550,
    quantity: 90,
    transport: "Train",
    perks: ["AC", "Meals Included"],
  },
];

const LatestTicketsSection = () => {
  return (
    <section className="max-w-7xl mx-auto pt-10 pb-20 px-6">
      <div className="mb-10">
        <h2 className="title">Latest Tickets</h2>
        <p className="subTitle">
          Check out our recently added tickets and book your next journey instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="card rounded-md shadow-sm shadow-gray-400 hover:bg-gray-50 duration-300"
          >
            <TicketCard ticket={ticket} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestTicketsSection;
