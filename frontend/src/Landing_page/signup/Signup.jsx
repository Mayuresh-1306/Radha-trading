import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create user data
    const token = "jwt-token-" + Date.now() + Math.random().toString(36).substr(2, 9);
    const userData = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Not provided",
      accountNumber: "RADHA" + Date.now().toString().substr(-6),
      joinDate: new Date().toISOString().split('T')[0],
      portfolioValue: 0,
      totalInvestments: 0
    };

    // Call login from AuthContext (will set redirect flag)
    login(token, userData);
    
    // Show success message
    setError("success");
    
    // Redirect to dashboard after a brief delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  // Test login function for quick testing
  const handleTestLogin = () => {
    const token = "test-jwt-token-" + Date.now();
    const userData = {
      id: 123456,
      name: "Test User",
      email: "test@radha.com",
      phone: "+91 9876543210",
      accountNumber: "RADHA789012",
      joinDate: "2024-01-15",
      portfolioValue: 142000,
      totalInvestments: 25350
    };
    
    login(token, userData);
    navigate("/dashboard");
  };

  return (
    <div className="signup-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-gradient-primary text-white text-center py-4">
                <h2 className="mb-0">
                  <i className="fas fa-user-plus me-2"></i>
                  Create Your Trading Account
                </h2>
                <p className="mb-0 mt-2">Start your investment journey in 5 minutes</p>
              </div>
              
              <div className="card-body p-4 p-md-5">
                {/* Success Message */}
                {error === "success" && (
                  <div className="alert alert-success text-center" role="alert">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="fas fa-check-circle fa-2x me-3 text-success"></i>
                      <div>
                        <h4 className="alert-heading mb-2">Account Created Successfully!</h4>
                        <p className="mb-0">Redirecting to your dashboard...</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && error !== "success" && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

                {/* Quick Test Login Button */}
                <div className="alert alert-info mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <i className="fas fa-bolt me-2"></i>
                      <strong>Quick Test:</strong> Want to skip the form?
                    </div>
                    <button 
                      type="button"
                      className="btn btn-sm btn-warning"
                      onClick={handleTestLogin}
                      disabled={isLoading}
                    >
                      <i className="fas fa-rocket me-1"></i>
                      Test Login
                    </button>
                  </div>
                </div>

                {/* Signup Form (only show if not success) */}
                {error !== "success" && (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">
                          <i className="fas fa-user me-2 text-primary"></i>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">
                          <i className="fas fa-envelope me-2 text-primary"></i>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="phone" className="form-label">
                          <i className="fas fa-phone me-2 text-primary"></i>
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 9876543210"
                          disabled={isLoading}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="password" className="form-label">
                          <i className="fas fa-lock me-2 text-primary"></i>
                          Password *
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a password (min. 6 characters)"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label htmlFor="confirmPassword" className="form-label">
                          <i className="fas fa-lock me-2 text-primary"></i>
                          Confirm Password *
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="col-md-6 mb-4 d-flex align-items-end">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="terms"
                            required
                            disabled={isLoading}
                          />
                          <label className="form-check-label" htmlFor="terms">
                            I agree to the <a href="/terms" className="text-decoration-none">Terms & Conditions</a> and <a href="/privacy" className="text-decoration-none">Privacy Policy</a>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="d-grid mb-3">
                      <button 
                        type="submit" 
                        className="btn btn-primary btn-lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-user-plus me-2"></i>
                            Create Account & Go to Dashboard
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-muted mb-2">
                        Already have an account? 
                        <button 
                          type="button"
                          className="btn btn-link p-0 ms-1"
                          onClick={handleTestLogin}
                          disabled={isLoading}
                        >
                          Login with test account
                        </button>
                      </p>
                    </div>
                  </form>
                )}

                {/* Account Features */}
                <div className="mt-4 pt-4 border-top">
                  <h5 className="mb-3">
                    <i className="fas fa-gift me-2 text-success"></i>
                    Get Started with These Benefits:
                  </h5>
                  <div className="row">
                    {[
                      { icon: "fas fa-rupee-sign", text: "Zero account opening charges" },
                      { icon: "fas fa-chart-line", text: "Free equity delivery trades" },
                      { icon: "fas fa-bolt", text: "Instant account activation" },
                      { icon: "fas fa-shield-alt", text: "256-bit SSL security" },
                      { icon: "fas fa-mobile-alt", text: "Mobile & web platform access" },
                      { icon: "fas fa-headset", text: "Dedicated customer support" }
                    ].map((benefit, index) => (
                      <div key={index} className="col-md-6 mb-2">
                        <i className={`${benefit.icon} me-2 text-primary`}></i>
                        <small>{benefit.text}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <a href="/" className="btn btn-outline-secondary">
                <i className="fas fa-arrow-left me-2"></i>
                Back to Home
              </a>
              <span className="mx-3 text-muted">|</span>
              <a href="/pricing" className="btn btn-outline-primary">
                <i className="fas fa-tag me-2"></i>
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;