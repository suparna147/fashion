import axios from 'axios';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-md-6">
            <Payment /> {/* Move Payment component to the left side */}
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems})<span>${Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>${shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>${Math.round(subtotal + shipping)}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvc, setCvc] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [upiId, setUpiId] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const navigate = useNavigate();

    const handlePaymentMethodChange = (event) => {
      setPaymentMethod(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      const paymentData = {
        method: paymentMethod,
        ...(paymentMethod === "card" && {
          name,
          cardNumber,
          cvc,
          expiryDate,
        }),
        ...(paymentMethod === "upi" && { upiId }),
      };

      try {
        await axios.post('http://127.0.0.1:8080/api/payments', paymentData);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowFeedback(true);
        }, 4000); // Show the success message for 4 seconds before redirecting
      } catch (error) {
        console.error('Error processing payment:', error);
      }
    };

    if (showFeedback) {
      navigate("/"); // Redirect to the feedback page
      return null;
    }

    return (
      <div style={styles.paymentForm}>
        <h2 style={styles.heading}>Payment Methods</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div style={styles.paymentOptions}>
            <label style={styles.label}>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={handlePaymentMethodChange}
                style={styles.radio}
              />
              <span style={styles.icon}>&#128179;</span> Debit/Credit Card
            </label>
            <label style={styles.label}>
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={handlePaymentMethodChange}
                style={styles.radio}
              />
              <span style={styles.icon}>&#128179;</span> UPI
            </label>
          </div>

          {paymentMethod === "card" && (
            <div style={styles.cardDetails}>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Name</label>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Card Number</label>
                <input
                  type="text"
                  placeholder="Credit Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Security Code (CVC)</label>
                <input
                  type="text"
                  placeholder="CVC"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Expiration Date</label>
                <input
                  type="text"
                  placeholder="MM/YYYY"
                  pattern="\d{2}/\d{4}"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div style={styles.upiDetails}>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>UPI ID</label>
                <input
                  type="text"
                  placeholder="Enter your UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.scanQr}>
                <p style={styles.qrText}>or scan with this QR code</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/330px-QR_code_for_mobile_English_Wikipedia.svg.png"
                  alt="QR Code"
                  style={styles.qrImage}
                />
              </div>
            </div>
          )}

          <button type="submit" style={styles.submitButton}>
            Submit Payment
          </button>
          {showSuccessMessage && (
            <div style={styles.popup}>
              <p style={styles.popupMessage}>Order placed successfully!</p>
              <button
                onClick={() => setShowSuccessMessage(false)}
                style={styles.popupButton}
              >
                OK
              </button>
            </div>
          )}
        </form>
      </div>
    );
  };

  const styles = {
    paymentForm: {
      padding: "20px",
      backgroundColor: "#f4f4f4",
      borderRadius: "8px",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    paymentOptions: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    label: {
      display: "flex",
      alignItems: "center",
      fontSize: "18px",
      cursor: "pointer",
    },
    radio: {
      marginRight: "10px",
    },
    icon: {
      marginRight: "10px",
      fontSize: "20px",
    },
    cardDetails: {
      marginBottom: "20px",
    },
    upiDetails: {
      marginBottom: "20px",
    },
    inputGroup: {
      marginBottom: "10px",
    },
    inputLabel: {
      fontSize: "16px",
      marginBottom: "5px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    scanQr: {
      display: "flex",
      alignItems: "center",
      marginTop: "20px",
    },
    qrText: {
      fontSize: "16px",
      color: "#333",
      marginRight: "20px",
    },
    qrImage: {
      width: "150px",
      height: "150px",
    },
    submitButton: {
      padding: "10px 20px",
      fontSize: "18px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    popup: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
    },
    popupMessage: {
      fontSize: "18px",
      marginBottom: "10px",
    },
    popupButton: {
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div>
      <Navbar />
      {state.length === 0 ? <EmptyCart /> : <ShowCheckout />}
      <Footer />
    </div>
  );
};

export default Checkout;
