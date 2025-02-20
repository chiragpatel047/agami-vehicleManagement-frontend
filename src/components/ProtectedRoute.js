import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, userType }) => {
  return allowedRoles.includes(userType) ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
