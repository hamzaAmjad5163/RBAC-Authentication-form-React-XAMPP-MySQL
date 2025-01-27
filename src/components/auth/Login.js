import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import '../../assets/css/auth.css';
import PasswordInput from "../fileds/Password";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting to log in...");

    try {
      const response = await fetch("http://localhost/react-app/auth/auth/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response Error:", errorText);
        setError("Server responded with an error.");
        return;
      }

      const data = await response.json();
      console.log("Response Data:", data);

      if (data.success) {
        setError("");
        // Store the user role in localStorage
        localStorage.setItem("user", JSON.stringify({ email: email, role: data.role }));
        console.log("User data stored:", { email: email, role: data.role });

        // Redirect based on the user role
        if (data.role === "Admin") {
          navigate("/admin");
        } else if (data.role === "Super Admin") {
          navigate("/super-admin");
        } else {
          navigate("/user");
        }
      } else {
        console.error("Data Error:", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleGoogleSuccess = async (response) => {
    console.log("Google login successful:", response);
    const tokenId = response.credential;

    try {
      const res = await fetch("http://localhost/react-app/auth/auth/google-login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: tokenId }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Response Error:", errorText);
        setError("Server responded with an error.");
        return;
      }

      const data = await res.json();
      console.log("Response Data:", data);

      if (data.success) {
        setError("");
        // Store the user role in localStorage
        localStorage.setItem("user", JSON.stringify({ email: response.profileObj.email, role: data.role }));
        console.log("User data stored:", { email: response.profileObj.email, role: data.role });

        // Redirect based on the user role
        if (data.role === "Admin") {
          navigate("/admin");
        } else if (data.role === "Super Admin") {
          navigate("/super-admin");
        } else {
          navigate("/user");
        }
      } else {
        console.error("Data Error:", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleGoogleFailure = (response) => {
    console.error("Google login failed:", response);
    setError("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId="292359010802-kbp57qpprhd54gdpbpsv0h3douvudfgt.apps.googleusercontent.com">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
          <h2 className="text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <PasswordInput
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
          </form>
          <div className="text-center gap-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap
            />
          </div>
          <p className="text-center mt-3">
            Forgot your password?{" "}
            <a href="/forget-password" className="text-decoration-none">Reset Password</a>
          </p>
          <p className="text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-decoration-none">Register</a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
