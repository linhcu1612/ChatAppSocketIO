/** @format */

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Unauthorized from "../pages/Auth/Unauthorized/Unauthorized";

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Unauthorized />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
