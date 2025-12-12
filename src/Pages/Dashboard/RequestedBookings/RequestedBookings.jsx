import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useContext } from "react";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { FaCheck, FaTimes } from "react-icons/fa";

const RequestedBookings = () => {
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext); // get logged-in vendor
  const [bookings, setBookings] = useState([]);

  const { data = [], refetch, isLoading } = useQuery({
    queryKey: ["pendingBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings?status=Pending");
      return res.data;
    },
  });

  // Filter bookings by vendorEmail
  useEffect(() => {
    if (user?.email) {
      const vendorBookings = data.filter((b) => b.vendorEmail === user.email);
      setBookings(vendorBookings);
    }
  }, [data, user]);

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.put(`/bookings/${id}`, { status });
      Swal.fire("Success", `Booking ${status.toLowerCase()}!`, "success");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Failed", "Could not update booking status", "error");
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (!bookings.length)
    return <p className="text-center py-10">No pending bookings</p>;

  return (
    <div className=" container mx-auto overflow-x-auto w-full mt-20 p-4">
      <h1 className="title">Bookings Requested</h1>
      <table className="table table-zebra w-full dark:bg-white">
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

  {/* Accept Button */}
  <button
    onClick={() => handleStatusChange(b._id, "Accepted")}
    className="btn btn-success btn-sm w-full sm:w-auto flex items-center justify-center"
  >
    <FaCheck className="text-white" />
  </button>

  {/* Reject Button */}
  <button
    onClick={() => handleStatusChange(b._id, "Rejected")}
    className="btn btn-error btn-sm w-full sm:w-auto flex items-center justify-center"
  >
    <FaTimes className="text-white" />
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
