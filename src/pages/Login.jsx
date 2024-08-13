import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "../components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Hook for navigation after successful login

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { email: "", password: "" };
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);

    if (email && password) {
      try {
        // Replace with your backend authentication API endpoint
        const response = await axios.post("http://localhost:8080/api/login", {
          email,
          password,
        });

        if (response.status === 200) {
          toast.success("Login successful!");

          // Optionally, store the JWT token or user data in local storage
          // localStorage.setItem("token", response.data.token);

          // Redirect to a protected route or dashboard
          navigate("/dashboard");

          // Reset form after successful login
          setEmail("");
          setPassword("");
        } else {
          toast.error("Invalid email or password.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Login failed. Please check your credentials and try again.");
      }
    }
  };

  const fadeInStyle = {
    animation: "fadeIn 1s ease-out forwards",
    opacity: 0,
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      

      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/white-feathered-head-with-feathers-it_1290686-30990.jpg?w=1060')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          padding: "20px",
          overflow: "hidden",
        }}
      >
        <div className="container my-3 py-3" style={fadeInStyle}>
          <h1 className="text-center">Login</h1>
          <hr />
          <div className="row my-4 h-100">
            <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="my-3">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <div className="my-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
                <div className="my-3">
                  <p>
                    New Here?{" "}
                    <Link
                      to="/register"
                      className="text-decoration-underline text-info"
                    >
                      Register
                    </Link>
                  </p>
                </div>
                <div className="text-center">
                  <button
                    className="my-2 mx-auto btn btn-dark"
                    type="submit"
                    style={fadeInStyle}
                    disabled={!email || !password}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Login;
