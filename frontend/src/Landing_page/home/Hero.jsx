import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="landing-hero">
      <div className="container py-5">
        <div className="row align-items-center min-vh-75">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="hero-badge mb-3">
              <span className="badge-glow">🚀 India's #1 Trading Platform</span>
            </div>
            <h1 className="hero-title">
              Invest in <span className="text-gradient-animated">Everything</span>
            </h1>
            <p className="hero-subtitle">
              Online platform to invest in stocks, derivatives, mutual funds,
              ETFs, and more — with zero brokerage on equity delivery.
            </p>
            <div className="hero-stats-inline">
              <div className="stat-pill">
                <strong>1.6Cr+</strong> <span>Users</span>
              </div>
              <div className="stat-pill">
                <strong>₹0</strong> <span>Brokerage</span>
              </div>
              <div className="stat-pill">
                <strong>15%</strong> <span>Market Share</span>
              </div>
            </div>
            <div className="hero-actions mt-4">
              <Link to="/signup" className="btn btn-hero-primary btn-lg me-3">
                <i className="fas fa-rocket me-2"></i>
                Start Trading
              </Link>
              <Link to="/pricing" className="btn btn-hero-outline btn-lg">
                View Pricing
                <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <div className="hero-image-wrapper">
              <img
                src="/media/homeHero.png"
                alt="Radha Trading Platform"
                className="hero-image"
              />
              <div className="hero-float-card card-1">
                <i className="fas fa-chart-line text-success"></i>
                <span>+12.5% Today</span>
              </div>
              <div className="hero-float-card card-2">
                <i className="fas fa-shield-alt text-primary"></i>
                <span>SEBI Regulated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;