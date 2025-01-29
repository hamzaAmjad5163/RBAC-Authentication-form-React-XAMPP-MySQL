import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute.js";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import ForgetPassword from "./components/auth/ForgetPassword";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Auth Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          {/* Protect the Admin route */}
          <Route element={<ProtectedRoute roleRequired="Admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          
          {/* Protect the Super Admin route */}
          <Route element={<ProtectedRoute roleRequired="Super Admin" />}>
            <Route path="/super-admin" element={<SuperAdminDashboard />} />
          </Route>
          
          {/* Protect the User route */}
          <Route element={<ProtectedRoute roleRequired="User" />}>
            <Route path="/user" element={<UserDashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
