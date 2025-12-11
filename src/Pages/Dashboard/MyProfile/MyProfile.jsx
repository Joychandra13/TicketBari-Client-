import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import avatar from "../../../assets/avatar.png"

const MyProfile = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth(); // logged-in Firebase user

  // Fetch all users from DB
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Find the logged in user's DB record
  const myProfile =
    users.find((u) => u.email === user?.email) || {};

  if (isLoading)
    return <p className="text-center py-10">Loading profile...</p>;

  return (
    <div className="container mx-auto mt-20 p-6  text-gray-400">
      <h1 className="title  text-center">My Profile</h1>

      <div className="max-w-md mx-auto mt-6 bg-white shadow-sm shadow-gray-400 rounded-md p-6">
        <div className="flex flex-col items-center">
          <img
            src={myProfile.photoURL || avatar}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />

          <h2 className="text-2xl font-bold mt-4">
            {myProfile.displayName || "No Name"}
          </h2>

          <p className="text-gray-600 text-sm">{myProfile.email}</p>

          <div className="mt-4 text-center text-gray-500">
            <p className="font-semibold">
              Role:{" "}
              <span className="capitalize text-blue-500">
                {myProfile.role}
              </span>
            </p>

            {myProfile.isFraud && (
              <p className="text-red-500 font-semibold mt-2">
                ⚠ This account is marked as FRAUD
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
