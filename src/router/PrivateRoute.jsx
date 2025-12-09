import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-ring loading-xl"></span></div>;
  }

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;