import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import { FaExclamationTriangle, FaStore, FaUserShield } from "react-icons/fa";
import avatar from "../../../assets/avatar.png"

const ManageUsers = () => {
  const axiosSecure = useAxios();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const updateRole = async (email, role) => {
    await axiosSecure.patch(`/users/update-role/${email}`, { role });
    Swal.fire("Success!", `User is now ${role}`, "success");
    refetch();
  };

  const markFraud = async (email) => {
    await axiosSecure.patch(`/users/mark-fraud/${email}`);
    Swal.fire("Fraud Marked", "Vendor restricted", "warning");
    refetch();
  };

  return (
    <div className="overflow-x-auto p-6 container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              {/* Serial Number */}
              <td className="font-semibold">{index + 1}</td>

              {/* Avatar */}
              <td>
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full">
                    <img
                      src={
                        user.photoURL ||
                        avatar
                      }
                      alt={user.displayName}
                    />
                  </div>
                </div>
              </td>

              <td className="font-semibold">{user.displayName}</td>
              <td>{user.email}</td>

              <td className="capitalize ">
                {user.role}
                {user.isFraud && (
                  <span className="text-red-500 ml-2">(Fraud)</span>
                )}
              </td>

              {/* Actions */}
              <td className="text-center">
                <div className="flex justify-end items-center gap-2">
                  {user.role !== "admin" && (
                    <FaUserShield
                      className="cursor-pointer text-blue-500"
                      title="Make Admin"
                      onClick={() => updateRole(user.email, "admin")}
                      size={20}
                    />
                  )}

                  {user.role !== "vendor" && (
                    <FaStore
                      className="cursor-pointer text-green-500"
                      title="Make Vendor"
                      onClick={() => updateRole(user.email, "vendor")}
                      size={20}
                    />
                  )}

                  {user.role === "vendor" && !user.isFraud && (
                    <FaExclamationTriangle
                      className="cursor-pointer text-red-500"
                      title="Mark Fraud"
                      onClick={() => markFraud(user.email)}
                      size={20}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
