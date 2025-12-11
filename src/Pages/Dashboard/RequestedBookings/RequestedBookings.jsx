import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const RequestedBookings = () => {
  const axiosSecure = useAxios();
  const [bookings, setBookings] = useState([]);

  const { data = [], refetch, isLoading } = useQuery({
    queryKey: ["pendingBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings?status=Pending");
      return res.data;
    },
  });

  // Sync query data to local state
  useEffect(() => {
    setBookings(data);
  }, [data]);

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.put(`/bookings/${id}`, { status });
      Swal.fire("Success", `Booking ${status.toLowerCase()}!`, "success");
    //   // Remove the updated booking from local state immediately
    //   setBookings(prev => prev.filter(b => b._id !== id));
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Failed", "Could not update booking status", "error");
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (!bookings.length) return <p className="text-center py-10">No pending bookings</p>;

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Ticket Title</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, index) => (
            <tr key={b._id}>
              <th>{index + 1}</th>
              <td>{b.userName || b.userEmail}</td>
              <td>{b.ticketTitle}</td>
              <td>{b.quantity}</td>
              <td>BDT {b.quantity * b.price}</td>
              <td className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleStatusChange(b._id, "Accepted")}
                  className="btn btn-success btn-sm w-full sm:w-auto"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange(b._id, "Rejected")}
                  className="btn btn-error btn-sm w-full sm:w-auto"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedBookings;
