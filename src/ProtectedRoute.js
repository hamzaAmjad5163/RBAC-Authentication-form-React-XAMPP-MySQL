import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roleRequired }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Assuming the user info is stored in localStorage

  useEffect(() => {
    console.log("Checking user role for protected route...", user);
    if (!user || user.role !== roleRequired) {
      navigate("/login"); // Redirect to login if not authorized
    }
  }, [user, roleRequired, navigate]);

  return user && user.role === roleRequired ? <Outlet /> : null;
};

export default ProtectedRoute;
