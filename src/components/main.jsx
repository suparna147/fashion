import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import firstLinkImage from "../Assests/first-link-image.jpg";
import howRURWorksImage from "../Assests/img1.jpg";
import secondLinkImage from "../Assests/second-link-image.jpg";

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();

  const styles = {
    hero: { border: "1px solid #ddd", paddingBottom: "3rem" },
    card: { position: "relative", margin: "0 1.5rem" },
    img: { width: "100%", height: "700px", objectFit: "cover" },
    overlay: {
      position: "absolute",
      bottom: "7rem",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      backgroundColor: "#4a2e2b",
      borderRadius: "0.5rem",
      padding: "0.5rem 1rem",
      animation: "fadeIn 1s ease-in-out",
    },
    icon: { color: "#fff", fontSize: "20px", marginRight: "0.5rem" },
    label: { color: "#fff", display: "flex", alignItems: "center" },
    button: {
      backgroundColor: "#fff",
      color: "#4a2e2b",
      border: "none",
      padding: "0.5rem 1rem",
      marginLeft: "1rem",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.3s ease",
    },
    infoSection: { marginTop: "2rem", textAlign: "center" },
    infoImage: {
      maxWidth: "1200px",
      width: "100%",
      margin: "0 auto",
      borderRadius: "0.5rem",
    },
    infoTitle: { marginTop: "1rem", fontSize: "1.5rem", fontWeight: "bold", color: "#4a2e2b" },
    linkContainer: { display: "flex", justifyContent: "space-between", margin: "4rem 0", gap: "1rem" },
    linkImageWrapper: {
      position: "relative",
      width: "calc(48% - 0.5rem)",
      height: "500px",
      borderRadius: "1rem",
      overflow: "hidden",
      cursor: "pointer",
      transition: "transform 0.3s ease",
    },
    linkImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.3s ease, filter 0.3s ease",
    },
    linkOverlay: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "#fff",
      fontSize: "2rem",
      fontWeight: "bold",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
  };

  const handleViewOutfitsClick = () => {
    navigate("/product");
  };

  const handleFirstLinkClick = () => {
    navigate("/product", { state: { category: "groomsmen" } });
  };

  const handleSecondLinkClick = () => {
    navigate("/product", { state: { category: "bridesmaids" } });
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}
      </style>
      <div style={styles.hero}>
        <div style={styles.card}>
          <img
            style={styles.img}
            src="https://www.rentanattire.com/uploaded_files/banner/555a6c8e1e21c35325a2e0ccfc744e14.jpg"
            alt="Card"
          />
          <div style={styles.overlay}>
            <div style={{ display: "flex", alignItems: "center", marginRight: "1rem" }}>
              <FaCalendarAlt style={styles.icon} />
              <span style={styles.label}>
                Rent From
                <DatePicker selected={startDate} onChange={setStartDate} />
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaCalendarAlt style={styles.icon} />
              <span style={styles.label}>
                To
                <DatePicker selected={endDate} onChange={setEndDate} />
              </span>
            </div>
            <button
              style={styles.button}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
              onClick={handleViewOutfitsClick}
            >
              View Outfits
            </button>
          </div>
        </div>
        <div style={styles.infoSection}>
          <h1 style={styles.infoTitle}>HOW RUR WORKS</h1>
          <img style={styles.infoImage} src={howRURWorksImage} alt="How RUR Works" />
        </div>
        <div style={styles.linkContainer}>
          <div
            style={styles.linkImageWrapper}
            onClick={handleFirstLinkClick}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.firstChild.style.filter = "blur(4px)";
              e.currentTarget.lastChild.style.opacity = 1;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.firstChild.style.filter = "blur(0)";
              e.currentTarget.lastChild.style.opacity = 0;
            }}
          >
            <img style={styles.linkImage} src={firstLinkImage} alt="First Link" />
            <div style={styles.linkOverlay}>Groomsmen</div>
          </div>
          <div
            style={styles.linkImageWrapper}
            onClick={handleSecondLinkClick}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.firstChild.style.filter = "blur(4px)";
              e.currentTarget.lastChild.style.opacity = 1;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.firstChild.style.filter = "blur(0)";
              e.currentTarget.lastChild.style.opacity = 0;
            }}
          >
            <img style={styles.linkImage} src={secondLinkImage} alt="Second Link" />
            <div style={styles.linkOverlay}>Bridesmaids</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
