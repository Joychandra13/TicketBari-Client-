import React from "react";
import { Link } from "react-router";
import TicketCard from "../../../components/TicketCard";

const tickets = [
  {
    id: 1,
    title: "Dhaka to Chittagong Bus",
    image: "https://ik.imagekit.io/joy1414/bus-2.jpg",
    price: 500,
    quantity: 40,
    transport: "Bus",
    perks: ["WiFi", "AC", "Snacks"],
  },
  {
    id: 2,
    title: "Dhaka to Sylhet Train",
    image: "https://ik.imagekit.io/joy1414/Dhaka-to-Sylhet-Train-Schedule-and-Ticket-Price.webp",
    price: 700,
    quantity: 100,
    transport: "Train",
    perks: ["AC", "Meals Included"],
  },
  {
    id: 3,
    title: "Dhaka to Barisal Launch",
    image: "https://ik.imagekit.io/joy1414/Dhaka-to-Barisal-Launch-Ticket-Price.webp",
    price: 300,
    quantity: 60,
    transport: "Launch",
    perks: ["Refreshments", "Life Jackets"],
  },
  {
    id: 4,
    title: "Dhaka to Cox's Bazar Flight",
    image: "https://ik.imagekit.io/joy1414/image-5352-1626268534.webp",
    price: 3500,
    quantity: 150,
    transport: "Plane",
    perks: ["Meal", "Baggage Included"],
  },
  {
    id: 5,
    title: "Dhaka to Khulna Bus",
    image: "https://ik.imagekit.io/joy1414/dhaka-to-khulna-bus-counter.jpg",
    price: 450,
    quantity: 50,
    transport: "Bus",
    perks: ["WiFi", "AC"],
  },
  {
    id: 6,
    title: "Dhaka to Rajshahi Train",
    image: "https://ik.imagekit.io/joy1414/Dhaka-to-Rajshahi-Train-Schedules-and-Ticket-Price.webp",
    price: 650,
    quantity: 120,
    transport: "Train",
    perks: ["AC", "Meals Included"],
  },
];

const AdvertisementSection = () => {
  return (
    <section className="max-w-7xl mx-auto pt-20 pb-10 px-6">
      <h2 className="title">
        Featured Tickets
      </h2>
      <p className="subTitle">
          Explore our hand-picked tickets chosen by Admin for your next journey.
        </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="card rounded-md shadow-sm shadow-gray-400 hover:bg-gray-50 duration-300">
            <TicketCard ticket={ticket}/>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvertisementSection;
