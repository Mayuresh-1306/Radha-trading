import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Toggle between Signup and Login forms
  const [isLoginMode, setIsLoginMode] = useState(false);

  // Signup form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Login form data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Password visibility toggles
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // ── REAL SIGNUP — calls POST /signup on your backend ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Client-side validation
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

    try {
      // 1. Register the user on the backend
      const signupRes = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const signupData = await signupRes.json();

      if (!signupRes.ok) {
        throw new Error(signupData.error || "Signup failed");
      }

      // 2. Automatically log in after successful signup
      const loginRes = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const loginResData = await loginRes.json();

      if (!loginRes.ok) {
        throw new Error(loginResData.error || "Auto-login failed");
      }

      // 3. Store real JWT token and user data
      const userData = {
        id: loginResData.id || Date.now(),
        name: loginResData.name || formData.name,
        email: formData.email,
        phone: formData.phone || "Not provided",
        accountNumber: "RADHA" + Date.now().toString().substr(-6),
        joinDate: new Date().toISOString().split("T")[0],
      };

      login(loginResData.token, userData);

      // Show success message
      setError("success");

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ── REAL LOGIN — calls POST /login on your backend ──
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid credentials");
      }

      // Store real JWT token and user data
      const userData = {
        id: data.id || Date.now(),
        name: data.name || "User",
        email: loginData.email,
      };

      login(data.token, userData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-gradient-primary text-white text-center py-4">
                <h2 className="mb-0">
                  <i
                    className={`fas ${isLoginMode ? "fa-sign-in-alt" : "fa-user-plus"} me-2`}
                  ></i>
                  {isLoginMode
                    ? "Login to Your Account"
                    : "Create Your Trading Account"}
                </h2>
                <p className="mb-0 mt-2">
                  {isLoginMode
                    ? "Welcome back! Enter your credentials"
                    : "Start your investment journey in 5 minutes"}
                </p>
              </div>

              <div className="card-body p-4 p-md-5">
                {/* Success Message */}
                {error === "success" && (
                  <div
                    className="alert alert-success text-center"
                    role="alert"
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="fas fa-check-circle fa-2x me-3 text-success"></i>
                      <div>
                        <h4 className="alert-heading mb-2">
                          Account Created Successfully!
                        </h4>
                        <p className="mb-0">
                          Redirecting to your dashboard...
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div
                        className="spinner-border text-success"
                        role="status"
                      >
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

                {/* ═══════════ LOGIN FORM ═══════════ */}
                {isLoginMode && error !== "success" && (
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="loginEmail" className="form-label">
                        <i className="fas fa-envelope me-2 text-primary"></i>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="loginEmail"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        placeholder="Enter your email"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="loginPassword" className="form-label">
                        <i className="fas fa-lock me-2 text-primary"></i>
                        Password *
                      </label>
                      <div className="input-group">
                        <input
                          type={showLoginPassword ? "text" : "password"}
                          className="form-control form-control-lg"
                          id="loginPassword"
                          name="password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          placeholder="Enter your password"
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          tabIndex={-1}
                        >
                          <i className={`fas ${showLoginPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                        </button>
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
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Logging in...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-sign-in-alt me-2"></i>
                            Login & Go to Dashboard
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-muted mb-0">
                        Don't have an account?{" "}
                        <button
                          type="button"
                          className="btn btn-link p-0 ms-1"
                          onClick={() => {
                            setIsLoginMode(false);
                            setError("");
                          }}
                        >
                          Create one here
                        </button>
                      </p>
                    </div>
                  </form>
                )}

                {/* ═══════════ SIGNUP FORM ═══════════ */}
                {!isLoginMode && error !== "success" && (
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
                        <div className="input-group">
                          <input
                            type={showSignupPassword ? "text" : "password"}
                            className="form-control form-control-lg"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password (min. 6 characters)"
                            required
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                            tabIndex={-1}
                          >
                            <i className={`fas ${showSignupPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                          </button>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <label
                          htmlFor="confirmPassword"
                          className="form-label"
                        >
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
                            I agree to the{" "}
                            <a
                              href="/terms"
                              className="text-decoration-none"
                            >
                              Terms & Conditions
                            </a>{" "}
                            and{" "}
                            <a
                              href="/privacy"
                              className="text-decoration-none"
                            >
                              Privacy Policy
                            </a>
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
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
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
                      <p className="text-muted mb-0">
                        Already have an account?{" "}
                        <button
                          type="button"
                          className="btn btn-link p-0 ms-1"
                          onClick={() => {
                            setIsLoginMode(true);
                            setError("");
                          }}
                        >
                          Login here
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
                      {
                        icon: "fas fa-rupee-sign",
                        text: "Zero account opening charges",
                      },
                      {
                        icon: "fas fa-chart-line",
                        text: "Free equity delivery trades",
                      },
                      {
                        icon: "fas fa-bolt",
                        text: "Instant account activation",
                      },
                      {
                        icon: "fas fa-shield-alt",
                        text: "256-bit SSL security",
                      },
                      {
                        icon: "fas fa-mobile-alt",
                        text: "Mobile & web platform access",
                      },
                      {
                        icon: "fas fa-headset",
                        text: "Dedicated customer support",
                      },
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