import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import CountdownTimer from "../../../components/CountdownTimer";
import BookTicketModal from "../BookTicketModal/BookTicketModal";
import useAuth from "../../../hooks/useAuth"; // assuming you have a hook for user info

const TicketDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch ticket details
  const { data: ticket, isLoading } = useQuery({
    queryKey: ["ticketDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");
      return res.data.find((t) => t._id === id);
    },
  });

  // Optional: fetch user's bookings (to refresh after booking)
  const { refetch: refetchBookings } = useQuery({
    queryKey: ["myBookings", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (!ticket) return <p className="text-center py-10">Ticket not found!</p>;

  const now = new Date();
  const departureTime = new Date(ticket.departure);
  const canBook = departureTime > now && ticket.quantity > 0;

  return (
    <div className="container mx-auto px-4 mt-20 py-20">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Ticket Image */}
        <img
          src={ticket.img || ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />

        <div className="flex flex-col justify-between space-y-3 text-gray-400 bg-gray-50 rounded-lg shadow-sm shadow-gray-400 p-4">
          {/* Countdown */}
          <CountdownTimer departure={ticket.departure} />

          <div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold">
              {ticket.title}
            </h1>
            <p className="text-xl lg:text-2xl mb-2">
              {ticket.from} → {ticket.to} → Transport: {ticket.transport}
            </p>
            <p className="text-lg">
              Price: BDT {ticket.price} | Quantity: {ticket.quantity}
            </p>
            <p className="text-lg">Perks: {ticket.perks?.join(", ")}</p>
            <p className="text-lg">
              Departure:{" "}
              {new Date(ticket.departure).toLocaleString("en-BD", {
                timeZone: "Asia/Dhaka",
              })}
            </p>
          </div>

          {/* Book Now Button */}
          <button
            className={`fullWidthButton mt-4 ${
              !canBook ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!canBook}
            onClick={() => setIsModalOpen(true)}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Book Ticket Modal */}
      {isModalOpen && (
        <BookTicketModal
          ticket={ticket}
          onClose={() => setIsModalOpen(false)}
          refetch={refetchBookings} 
        />
      )}
    </div>
  );
};

export default TicketDetails;
