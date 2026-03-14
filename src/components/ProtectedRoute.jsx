import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = localStorage.getItem("user");

  // Agar user nahi hai, toh direct Login page par bhej do
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Agar user hai, toh baaki pages dikhao (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
