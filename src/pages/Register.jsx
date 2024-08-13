// import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "../components";


const Register = () => {
    // Initialize state variables for form fields and errors
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "", password: "", mobile: "" });

    const navigate = useNavigate(); // Hook for navigation

    // Handlers for form field changes
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleMobileChange = (e) => setMobile(e.target.value);

    // Validate form fields
    const validate = () => {
        const newErrors = { firstName: "", lastName: "", email: "", password: "", mobile: "" };
        let isValid = true;

        if (!firstName) {
            newErrors.firstName = "First Name is required.";
            isValid = false;
        }
        if (!lastName) {
            newErrors.lastName = "Last Name is required.";
            isValid = false;
        }
        if (!email) {
            newErrors.email = "Email is required.";
            isValid = false;
        }
        if (!password) {
            newErrors.password = "Password is required.";
            isValid = false;
        }
        if (!mobile) {
            newErrors.mobile = "Mobile number is required.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await axios.post("http://localhost:8080/users", { // Replace with your backend URL
                    id:0,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    mobile: mobile,
                    roles: "USER" // Default role; adjust as needed
                });

                if (response.status === 200 || response.status === 201) {
                    toast.success("Registration successful!");
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                    setMobile("");
                    navigate('/login');
                } else {
                    toast.error("Registration failed.");
                }
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong.");
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
                        "url('https://img.freepik.com/premium-photo/gold-brown-leaves-light-purple-background-with-copy-space_1000823-66559.jpg?w=1060')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    padding: "20px",
                    overflow: "hidden",
                }}
            >
                <div className="container my-3 py-3" style={fadeInStyle}>
                    <h1 className="text-center">Register</h1>
                    <hr />
                    <div className="row my-4 h-100">
                        <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="form my-3">
                                    <label htmlFor="FirstName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="FirstName"
                                        placeholder="Enter Your First Name"
                                        value={firstName}
                                        onChange={handleFirstNameChange}
                                    />
                                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                                </div>
                                <div className="form my-3">
                                    <label htmlFor="LastName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="LastName"
                                        placeholder="Enter Your Last Name"
                                        value={lastName}
                                        onChange={handleLastNameChange}
                                    />
                                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                                </div>
                                <div className="form my-3">
                                    <label htmlFor="Email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="Email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                </div>
                                <div className="form my-3">
                                    <label htmlFor="Password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="Password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                </div>
                                <div className="form my-3">
                                    <label htmlFor="Mobile">Mobile</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Mobile"
                                        placeholder="Enter Your Mobile Number"
                                        value={mobile}
                                        onChange={handleMobileChange}
                                    />
                                    {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
                                </div>
                                <div className="my-3">
                                    <p>Already have an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link></p>
                                </div>
                                <div className="text-center">
                                    <button className="my-2 mx-auto btn btn-dark" type="submit" disabled={!firstName || !lastName || !email || !password || !mobile}>
                                        Register
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

export default Register;
