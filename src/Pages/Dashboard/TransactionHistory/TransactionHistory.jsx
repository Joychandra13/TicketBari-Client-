import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  console.log(user);
  // Fetch user's transactions
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (!transactions.length)
    return <p className="text-center py-10">No transactions found.</p>;

  return (
    <div className="card container mx-auto px-4 mt-20 py-10">
      <h1 className="title text-center">Transaction History</h1>

      <div className="overflow-x-auto rounded-lg border border-base-content/10 bg-base-100  mt-6">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount (BDT)</th>
              <th>Ticket Title</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={tx._id}>
                <th>{index + 1}</th>
                <td>{tx.transactionId}</td>
                <td>{tx.amount}tk</td>
                <td>{tx.ticketTitle}</td>
                <td>
                  {new Date(tx.paidAt).toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
