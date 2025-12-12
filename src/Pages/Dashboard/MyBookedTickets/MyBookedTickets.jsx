import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import BookedCountdownTimer from "../../../components/BookedCountdownTimer";
import { Link } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";

const MyBookedTickets = () => {
  const { user } = useContext(AuthContext); // Get logged-in user
  const axios = useAxios();

  // Fetch bookings for this user only
  const {
    data: bookings = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axios.get(`/bookings?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only run if user email exists
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (!bookings.length)
    return (
      <p className="text-center text-gray-400 py-10">
        No bookings found
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="title text-center">My Booked Tickets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="card bg-white rounded shadow-sm shadow-gray-400 p-4 flex flex-col text-gray-400"
          >
            <h2 className="text-lg font-bold mt-2">
              {b.ticketTitle}{" "}
              <span className="text-base font-light">
                ({b.from} → {b.to})
              </span>
            </h2>

            <p>
              Quantity: {b.quantity} | Total: BDT {b.quantity * b.price}
            </p>
            <p>
              Status:{" "}
              <span
                className={`font-semibold ${
                  b.status === "Accepted"
                    ? "text-green-500"
                    : b.status === "Rejected"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {b.status}
              </span>
            </p>

            {/* Optional Countdown for Accepted or Pending */}
            {b.status !== "Rejected" && b.departure && (
              <BookedCountdownTimer departure={b.departure} />
            )}

            {/* Pay button */}
            {b.status === "Accepted" &&
              new Date(b.departure) > new Date() &&
              (b.status === "paid" ? (
                <span className="fullWidthButton mt-2">Paid</span>
              ) : (
                <Link
                  to={`/dashboard/payment/${b._id}`}
                  className="fullWidthButton mt-2"
                >
                  Pay Now
                </Link>
              ))}

            {/* Book Again button if Pending */}
            {b.status === "Pending" && (
              <Link to="/all-tickets" className="fullWidthButton mt-2">
                Book Again
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookedTickets;
