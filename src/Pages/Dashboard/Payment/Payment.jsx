import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const Payment = () => {
    const{user} = useAuth()
  const { ticketId } = useParams();
  const axiosSecure = useAxios();

  const { isLoading, data: ticket } = useQuery({
    queryKey: ["tickets", ticketId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${ticketId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handlePayment = async () => {
    const paymentInfo = {
      price: ticket.price, // must exist
      quantity: ticket.quantity, // must exist
      ticketTitle: ticket.ticketTitle, // must exist
      ticketId: ticket.ticketId, // must exist
      bookingId: ticket._id, // must exist
      userEmail: user?.email,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );

    console.log(res.data.url);

    window.location.assign(res.data.url)
  };

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-sm shadow-gray-400 rounded p-6 max-w-md mx-auto text-gray-400">
        <h1 className="text-2xl font-bold mb-4">Payment Summary</h1>

        <p className="mb-2">
          <span className="font-semibold">Ticket:</span> {ticket.ticketTitle}
        </p>
        <p className="mb-2">
          <span className="font-semibold">From → To:</span> {ticket.from} → {ticket.to}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Departure:</span>{" "}
          {new Date(ticket.departure).toLocaleString("en-BD", { timeZone: "Asia/Dhaka" })}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Quantity:</span> {ticket.quantity}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Total Amount:</span> BDT {ticket.price * ticket.quantity}
        </p>

        <button
          onClick={handlePayment}
          className="fullWidthButton"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
