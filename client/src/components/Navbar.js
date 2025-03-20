import React from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const token = localStorage.getItem("token");
  
  let userName = "User"; 

  if (token) {
    try {
      const decodedToken = jwtDecode(token); 
      userName = decodedToken.userName || "User"; 
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    window.location.href = "/login"; 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          <span className="text-warning">Finance</span> Tracker
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item mx-2">
              <Link className="nav-link text-light fw-semibold" to="/">Home</Link>
            </li>

            {token ? (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-light fw-semibold" to="/dashboard">Dashboard</Link>
                </li>

               
                <li className="nav-item mx-2">
                  <span className="nav-link text-warning fw-bold">Hello, {userName}!</span>
                </li>

                <li className="nav-item mx-2">
                  <button className="btn btn-warning px-4 fw-semibold" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item mx-2">
                <Link className="btn btn-outline-warning px-4 fw-semibold" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
