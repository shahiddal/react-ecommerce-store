import { Navigate, Outlet } from "react-router-dom";

const AdminGuard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Check: User login  role 'admin'
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />; // Agar admin nahi hai toh Home bhej do
  }

  return <Outlet />;
};

export default AdminGuard;
