import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaMoneyBillWave, FaClipboardCheck } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay">
          <div className="hero-content text-center">
            <h1 className="display-3 fw-bold">Personal Finance Tracker</h1>
            <p className="lead">
              Take control of your income, expenses, and savings effortlessly.
            </p>
            <button className="btn btn-lg btn-primary shadow-lg" onClick={() => navigate("/dashboard")}>
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Why Choose Us?</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="feature-card">
              <FaChartLine className="feature-icon" />
              <h3 className="fw-bold">Track Income</h3>
              <p>Monitor and analyze your earnings effortlessly.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <FaMoneyBillWave className="feature-icon" />
              <h3 className="fw-bold">Manage Expenses</h3>
              <p>Keep track of where your money goes.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <FaClipboardCheck className="feature-icon" />
              <h3 className="fw-bold">Budget Planning</h3>
              <p>Set financial goals and achieve financial stability.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-3">
        <p>© {new Date().getFullYear()} Personal Finance Tracker. All rights reserved.</p>
      </footer>

      {/* Styles */}
      <style>
        {`
          .home-container {
            font-family: 'Poppins', sans-serif;
            color: #333;
          }
          
          /* Hero Section */
          .hero-section {
            background: linear-gradient(135deg, #6a11cb, #2575fc);
            height: 50vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: #fff;
          }
          
          .btn-primary {
            background: #ff8c00;
            border: none;
            padding: 12px 24px;
            font-size: 1.2rem;
            border-radius: 8px;
            transition: transform 0.3s ease, background 0.3s ease;
          }
          .btn-primary:hover {
            background: #e07b00;
            transform: scale(1.1);
          }
          
          /* Features Section */
          .feature-card {
            padding: 2rem;
            border-radius: 12px;
            background: #f4f4f4;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
          }
          
          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.2);
          }
          
          .feature-icon {
            font-size: 3rem;
            color: #2575fc;
            margin-bottom: 10px;
          }
          
          /* Footer */
          footer {
            background: #222;
            color: #fff;
            padding: 15px 0;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
