import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const BookTicketModal = ({ ticket, onClose, refetch }) => {
  const { user } = useAuth();
  const axios = useAxios();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    if (quantity < 1 || quantity > ticket.quantity) {
      Swal.fire("Failed", "Quantity invalid", "error");
      return;
    }

    try {
      setLoading(true);
      const bookingData = {
        ticketId: ticket._id,
        ticketTitle: ticket.title,
        ticketImg: ticket.img || ticket.image,
        quantity,
        price: ticket.price,
        from: ticket.from,
        to: ticket.to,
        departure: ticket.departure,
        status: "Pending",
        createdAt: new Date(),
        vendorEmail:ticket.vendorEmail,
        userName: user?.displayName,
        userEmail: user?.email,
      };

      await axios.post("/bookings", bookingData);
      Swal.fire("Success", "Booking successful!", "success");
      onClose();
      refetch(); 
    } catch (error) {
      console.error(error);
      Swal.fire("Failed", "Booking failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-gray-400">
      <div className="bg-white p-6 rounded-lg shadow-sm shadow-gray-400 w-full max-w-sm relative">
        <button
          className="absolute top-2 right-2 btn btn-ghost btn-circle"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-2">Book Ticket</h2>
        <p className="mb-2">Available: {ticket.quantity}</p>
        <input
          type="number"
          min={1}
          max={ticket.quantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="input w-full mb-4"
        />
        <button
          onClick={handleBook}
          className={`fullWidthButton ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Booking..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default BookTicketModal;
