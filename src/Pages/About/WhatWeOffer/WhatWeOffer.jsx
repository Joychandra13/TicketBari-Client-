import React from "react";
import { FaBus, FaPlane, FaShip, FaTrain } from "react-icons/fa";

const WhatWeOffer = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6 text-center">
      <h2 className="title">What We Offer</h2>
      <p className="subTitle max-w-2xl mx-auto">
        We bring multiple travel services together for your comfort and
        convenience.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mt-10 text-gray-400">
        <div className="flex flex-col items-center">
          <FaBus className="text-4xl" />
          <p className="mt-2">Bus Tickets</p>
        </div>
        <div className="flex flex-col items-center">
          <FaTrain className="text-4xl" />
          <p className="mt-2">Train Tickets</p>
        </div>
        <div className="flex flex-col items-center">
          <FaShip className="text-4xl" />
          <p className="mt-2">Launch Tickets</p>
        </div>
        <div className="flex flex-col items-center">
          <FaPlane className="text-4xl" />
          <p className="mt-2">Flight Tickets</p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
