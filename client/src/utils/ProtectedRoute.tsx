import { Navigate, Outlet } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

const getRoleFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null; 

  try {
    const decoded: { role: string } = jwtDecode(token);
    console.log(decoded);
    return decoded.role; 
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

const ProtectedRoute = ({ role }: { role: string }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getRoleFromToken();
  console.log(userRole); 

  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
