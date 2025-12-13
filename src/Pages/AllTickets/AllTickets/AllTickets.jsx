import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";

const AllTickets = () => {
  const axiosSecure = useAxios();

  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [transportFilter, setTransportFilter] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 6;

  // Fetch approved tickets
  const { data: tickets = [], isLoading: loadingTickets } = useQuery({
    queryKey: ["allTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/approved");
      return res.data;
    },
  });

  // Fetch users to filter out fraud vendors
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (loadingTickets || loadingUsers) return <Loading />;

  // Filter out tickets whose vendor is fraud
  let filteredTickets = tickets.filter((ticket) => {
    const vendor = users.find((u) => u.email === ticket.vendorEmail);
    return !vendor?.isFraud;
  });

  // Dynamic transport options
  const transportOptions = [...new Set(filteredTickets.map(t => t.transport))];

  // Apply From & To search
  if (fromSearch) {
    filteredTickets = filteredTickets.filter(t =>
      t.from.toLowerCase().includes(fromSearch.toLowerCase())
    );
  }
  if (toSearch) {
    filteredTickets = filteredTickets.filter(t =>
      t.to.toLowerCase().includes(toSearch.toLowerCase())
    );
  }

  // Apply transport filter
  if (transportFilter) {
    filteredTickets = filteredTickets.filter(t => t.transport === transportFilter);
  }

  // Apply sort
  if (sortOrder) {
    filteredTickets.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }

  // Pagination calculation
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto mt-20 pt-20 pb-10 px-6">
      <h1 className="title">All Tickets</h1>
      <p className="subTitle mb-6">
        Browse all available tickets and filter by location, transport, and price.
      </p>

      {/* Search / Filter / Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search From"
          value={fromSearch}
          onChange={(e) => setFromSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/4"
        />
        <input
          type="text"
          placeholder="Search To"
          value={toSearch}
          onChange={(e) => setToSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/4"
        />
        <select
          value={transportFilter}
          onChange={(e) => setTransportFilter(e.target.value)}
          className="select select-bordered w-full md:w-1/4"
        >
          <option value="">All Transports</option>
          {transportOptions.map((transport) => (
            <option key={transport} value={transport}>
              {transport}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered w-full md:w-1/4"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedTickets.length > 0 ? (
          paginatedTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="card rounded-lg shadow-sm shadow-gray-400 bg-white hover:bg-gray-50 duration-300"
            >
              <img
                src={ticket.image || ticket.img}
                alt={ticket.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold text-gray-400">{ticket.title}</h2>
                <p className="text-gray-500">
                  {ticket.from} → {ticket.to} | Transport: {ticket.transport}
                </p>
                <p className="text-gray-500">
                  Price: BDT {ticket.price} | Quantity: {ticket.quantity}
                </p>
                <p className="text-gray-500">
                  Perks: {Array.isArray(ticket.perks) ? ticket.perks.join(", ") : ticket.perks}
                </p>
                <p className="text-gray-500">
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
                <Link to={`/ticket/${ticket._id}`}>
                  <button className="mt-3 fullWidthButton">See Details</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No tickets found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {filteredTickets.length > ticketsPerPage && (
        <div className="flex justify-between mt-6">
          <button
            className=" w-fit btn btn-outline "
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous page
          </button>
          <button
            className=" w-fit btn btn-outline "
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next page
          </button>
        </div>
      )}
    </div>
  );
};

export default AllTickets;
