import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import TicketCard from "../../../components/TicketCard";

const LatestTicketsSection = () => {
  const axiosSecure = useAxios();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["approvedTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/approved");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  // Sort by creation date descending and get latest 6 tickets
  const latestTickets = tickets
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

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

export default LatestTicketsSection;
