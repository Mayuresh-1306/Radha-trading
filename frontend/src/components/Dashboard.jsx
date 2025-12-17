import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  
  const userInfo = user ? (typeof user === 'string' ? JSON.parse(user) : user) : null;

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">
            <i className="fas fa-tachometer-alt me-2"></i>
            Dashboard
          </span>
          
          <div className="d-flex align-items-center">
            <span className="text-white me-3">
              <i className="fas fa-user-circle me-2"></i>
              {userInfo?.name || "User"}
            </span>
            <button onClick={logout} className="btn btn-outline-light btn-sm">
              <i className="fas fa-sign-out-alt me-1"></i>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Welcome Message */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5 text-center">
                <div className="mb-4">
                  <i className="fas fa-check-circle fa-4x text-success mb-4"></i>
                  <h1 className="display-5 fw-bold mb-3">Welcome to Your Dashboard!</h1>
                  <p className="lead mb-4">
                    Hello <span className="text-primary fw-bold">{userInfo?.name}</span>, 
                    your account has been successfully created.
                  </p>
                </div>

                <div className="row mb-5">
                  <div className="col-md-4 mb-3">
                    <div className="card bg-light border-0 h-100">
                      <div className="card-body">
                        <i className="fas fa-id-card fa-2x text-primary mb-3"></i>
                        <h5>Account Number</h5>
                        <h3 className="fw-bold">{userInfo?.accountNumber || "RADHA789012"}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card bg-light border-0 h-100">
                      <div className="card-body">
                        <i className="fas fa-calendar-check fa-2x text-success mb-3"></i>
                        <h5>Member Since</h5>
                        <h3 className="fw-bold">{userInfo?.joinDate || "2024-01-01"}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card bg-light border-0 h-100">
                      <div className="card-body">
                        <i className="fas fa-envelope fa-2x text-warning mb-3"></i>
                        <h5>Email</h5>
                        <h6 className="fw-bold">{userInfo?.email || "user@example.com"}</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="alert alert-info">
                  <h5>
                    <i className="fas fa-rocket me-2"></i>
                    Get Started with These Quick Actions:
                  </h5>
                  <div className="d-flex flex-wrap gap-3 justify-content-center mt-3">
                    <a href="/" className="btn btn-primary">
                      <i className="fas fa-home me-2"></i>
                      Visit Homepage
                    </a>
                    <a href="/products" className="btn btn-success">
                      <i className="fas fa-chart-line me-2"></i>
                      Explore Products
                    </a>
                    <button onClick={logout} className="btn btn-outline-danger">
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;