import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to Rentique</h1>
        <p>Wear the Change: Rent Fashion, Redefine Your Style.</p>
        <div className="button-group">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
      </header>
    </div>
  );
};

export default Landing;