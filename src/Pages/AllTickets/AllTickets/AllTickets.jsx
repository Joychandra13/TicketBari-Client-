import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";

const AllTickets = () => {
  const axiosSecure = useAxios();

  // Fetch all tickets
  const { data: tickets = [], isLoading: loadingTickets } = useQuery({
    queryKey: ["allTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");
      return res.data;
    },
  });

  // Fetch all users to check for fraud vendors
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (loadingTickets || loadingUsers) {
    return <Loading/>;
  }

  // Filter out tickets whose vendor is fraud
  const filteredTickets = tickets.filter((ticket) => {
    const vendor = users.find((u) => u.email === ticket.vendorEmail);
    return !vendor?.isFraud;
  });

  return (
    <div className="max-w-7xl mx-auto mt-20 pt-20 pb-10 px-6">
      <h1 className="title">View All Tickets</h1>
      <p className="subTitle">
        Browse through all available tickets and see details for each trip.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="rounded-lg shadow-sm shadow-gray-400 bg-white"
            >
              {/* Image */}
              <img
                src={ticket.image || ticket.img}
                alt={ticket.title}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold text-gray-400">
                  {ticket.title}
                </h2>

                <p className="text-gray-400">
                  {ticket.from} → {ticket.to} → Transport: {ticket.transport}
                </p>
                <p className="text-gray-400">
                  Price: BDT {ticket.price} and Quantity: {ticket.quantity}
                </p>

                {/* Perks */}
                <p className="text-gray-400">
                  Perks:{" "}
                  {Array.isArray(ticket.perks)
                    ? ticket.perks.join(", ")
                    : ticket.perks}
                </p>

                <p className="text-gray-400">
                  Departure:{" "}
                  {new Date(ticket.departure).toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {/* Details button */}
                <Link to={`/ticket/${ticket._id}`}>
                  <button className="mt-3 fullWidthButton">See Details</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No tickets available.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllTickets;
