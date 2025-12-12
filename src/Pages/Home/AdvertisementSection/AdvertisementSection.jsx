import React from "react";
import { useQuery } from "@tanstack/react-query";
import TicketCard from "../../../components/TicketCard";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";

const AdvertisementSection = () => {
  const axiosSecure = useAxios();

  // Fetch only advertised tickets
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["advertisedTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/advertised");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading/>;
  }

  if (!tickets.length) {
    return <p className="text-center py-10">No Featured Tickets Available.</p>;
  }

  return (
    <section className="max-w-7xl mx-auto pt-20 pb-10 px-6">
      <h2 className="title">Featured Tickets</h2>
      <p className="subTitle">
        Explore our hand-picked tickets chosen by Admin for your next journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="card rounded-md shadow-sm shadow-gray-400 hover:bg-gray-50 duration-300"
          >
            <TicketCard ticket={ticket} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvertisementSection;
