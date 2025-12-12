import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import Loading from "../../../components/Loading";

const RevenueOverview = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  // Fetch ALL tickets
  const { data: tickets = [], isLoading: loadingTickets } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");
      return res.data;
    },
  });

  // Fetch ALL bookings
  const { data: bookings = [], isLoading: loadingBookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  if (loadingTickets || loadingBookings)
    return <Loading/>;

  // ---------- FILTER BY VENDOR ----------
  const vendorTickets = tickets.filter((t) => t.vendorEmail === user.email);
  const vendorTicketIds = vendorTickets.map((t) => t._id);

  const vendorBookings = bookings.filter((b) =>
    vendorTicketIds.includes(b.ticketId)
  );

  // ---------- CALCULATIONS ----------

  // Total Revenue from bookings with status 'paid'
  const totalRevenue = vendorBookings
    .filter((b) => b.status === "paid")
    .reduce((acc, b) => acc + b.price * b.quantity, 0);

  // Total Tickets Sold (paid bookings only)
  const totalTicketsSold = vendorBookings
    .filter((b) => b.status === "paid")
    .reduce((acc, b) => acc + b.quantity, 0);

  // Total Tickets Added
  const totalTicketsAdded = vendorTickets.length;

  // Revenue chart data
  const revenueChartData = vendorBookings
    .filter((b) => b.status === "paid")
    .map((b) => ({
      date: b.paidAt?.slice(0, 10),
      amount: b.price * b.quantity,
    }));

  // Tickets sold chart
  const ticketsChartData = vendorBookings.map((b) => ({
    title: b.ticketTitle,
    quantity: b.quantity,
  }));

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="title text-center mb-8">Revenue Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-white shadow rounded-md">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-600">
            BDT {totalRevenue}
          </p>
        </div>

        <div className="p-6 bg-white shadow rounded-md">
          <h2 className="text-lg font-semibold">Total Tickets Sold</h2>
          <p className="text-3xl font-bold text-blue-600">
            {totalTicketsSold}
          </p>
        </div>

        <div className="p-6 bg-white shadow rounded-md">
          <h2 className="text-lg font-semibold">Total Tickets Added</h2>
          <p className="text-3xl font-bold text-purple-600">
            {totalTicketsAdded}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* Revenue Chart */}
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-xl font-semibold mb-3 text-center">
            Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#4CAF50"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tickets Sold Chart */}
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-xl font-semibold mb-3 text-center">
            Tickets Sold
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ticketsChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
