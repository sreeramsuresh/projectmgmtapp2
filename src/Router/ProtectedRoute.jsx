// src/Router/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * ProtectedRoute component that checks for authentication and optional role requirements
 * @param {Object} props - Component props
 * @param {Array} props.allowedRoles - Array of roles that are allowed to access the route
 * @param {React.ReactNode} props.children - Child components
 */
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required and user doesn't have the role, redirect to unauthorized
  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render children or the outlet (for nested routes)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
