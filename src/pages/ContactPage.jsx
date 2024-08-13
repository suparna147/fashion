import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Footer, Navbar } from "../components";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0); // Add rating state
  const [loading, setLoading] = useState(false);

  const fadeInStyle = {
    animation: "fadeIn 1s ease-out forwards",
    opacity: 0,
  };

  const fadeInDelayStyle = {
    ...fadeInStyle,
    animationDelay: "0.5s",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8080/api/feedback", {
        name,
        email,
        message,
        rating, // Include rating in the request
      });

      if (response.status === 200) {
        toast.success("Feedback sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
        setRating(0); // Reset rating
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
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
      <Navbar />
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
        <div style={{ color: "white", paddingTop: "50px", paddingLeft: "50px" }}>
          <div className="container my-3 py-3">
            <div
              style={{
                ...fadeInStyle,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)",
                borderRadius: "10px",
                padding: "2px",
                maxWidth: "600px",
                margin: "0 auto",
                position: "relative", // Added relative positioning
                top: "-50px", // Move the form upward
              }}
            >
              <h1 className="text-center" style={{ color: "black" }}>
                Contact Us
              </h1>
              <hr />
              <div className="row my-4 h-100">
                <div className="col">
                  <form onSubmit={handleSubmit} style={fadeInDelayStyle}>
                    <div className="form-group my-3">
                      <h2 className="text-center" style={{ color: "black" }}>
                        Give Your Feedback
                      </h2>
                      <label htmlFor="Name" style={{ color: "black" }}>
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px",
                        }}
                      />
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="Email" style={{ color: "black" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="Email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px",
                        }}
                      />
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="Message" style={{ color: "black" }}>
                        Message
                      </label>
                      <textarea
                        rows={5}
                        className="form-control"
                        id="Message"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px",
                        }}
                      />
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="Rating" style={{ color: "black" }}>
                        Rating
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="Rating"
                        placeholder="Rate us out of 5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px",
                        }}
                        min="1"
                        max="5"
                      />
                    </div>
                    <div className="text-center">
                      <button
                        className="my-2 px-4 mx-auto btn btn-dark"
                        type="submit"
                        disabled={loading}
                        style={fadeInDelayStyle}
                      >
                        <b>{loading ? "Sending..." : "SEND"}</b>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default ContactPage;
