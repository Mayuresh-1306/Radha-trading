import React from 'react';
import { Link } from 'react-router-dom';

function OpenAccount() {
    return (
        <section className="cta-section">
            <div className="cta-gradient-bg">
                <div className="container py-5">
                    <div className="text-center">
                        <h2 className="cta-title text-white mb-3">
                            Open a Radha account
                        </h2>
                        <p className="cta-subtitle text-white-50 mb-4">
                            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
                        </p>
                        <div className="cta-features mb-4">
                            <span className="cta-feature">
                                <i className="fas fa-check-circle me-1"></i> Free Account
                            </span>
                            <span className="cta-feature">
                                <i className="fas fa-check-circle me-1"></i> Zero Brokerage
                            </span>
                            <span className="cta-feature">
                                <i className="fas fa-check-circle me-1"></i> SEBI Regulated
                            </span>
                        </div>
                        <Link to="/signup" className="btn btn-cta-white btn-lg">
                            <i className="fas fa-user-plus me-2"></i>
                            Sign up for free
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OpenAccount;