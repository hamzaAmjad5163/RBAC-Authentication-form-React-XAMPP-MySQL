import React, { useState } from "react";
import PasswordInput from "../fileds/Password";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/react-app/auth/auth/reset-password.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response Error:", errorText);
        setMessage("Server responded with an error.");
        return;
      }

      const data = await response.json();
      setMessage(data.message || "Password reset successful.");
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Reset Password</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <PasswordInput
              type="password"
              id="newPassword"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Reset Password</button>
          <p className="text-center mt-3">
           Go to {" "}
          <a href="/login" className="text-decoration-none">Login Page</a>
        </p>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
