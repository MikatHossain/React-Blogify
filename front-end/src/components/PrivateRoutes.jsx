import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? (
    <div className="mt-28 mb-28">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
