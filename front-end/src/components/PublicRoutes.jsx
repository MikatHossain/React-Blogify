import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoutes = () => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <div className="mt-28 mb-28">
      <Outlet />
    </div>
  );
};

export default PublicRoutes;
