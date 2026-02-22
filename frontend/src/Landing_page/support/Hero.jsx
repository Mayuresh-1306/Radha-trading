import React from 'react';

function Hero() {
   return (
      <section className="support-hero-section">
         <div className="support-hero-gradient">
            <div className="container py-5">
               <div className="row align-items-center">
                  <div className="col-lg-7">
                     <div className="hero-badge mb-3">
                        <span className="badge-glow">
                           <i className="fas fa-headset me-2"></i>Support Portal
                        </span>
                     </div>
                     <h1 className="support-hero-title text-white mb-3">
                        How can we help you today?
                     </h1>
                     <p className="text-white-50 mb-4" style={{ maxWidth: '500px' }}>
                        Search for answers or browse help topics to create a support ticket.
                     </p>

                     {/* Search Bar */}
                     <div className="support-search-wrapper mb-4">
                        <div className="input-group input-group-lg">
                           <span className="input-group-text bg-white border-0">
                              <i className="fas fa-search text-muted"></i>
                           </span>
                           <input
                              type="text"
                              className="form-control border-0 shadow-none"
                              placeholder="Eg: How do I activate F&O, add funds, place an order..."
                           />
                           <button className="btn btn-hero-primary">Search</button>
                        </div>
                     </div>

                     {/* Quick Links */}
                     <div className="support-quick-links">
                        <span className="text-white-50 me-2 small">Popular:</span>
                        <a href="#" className="support-quick-link">Track account opening</a>
                        <a href="#" className="support-quick-link">Segment activation</a>
                        <a href="#" className="support-quick-link">Intraday margins</a>
                        <a href="#" className="support-quick-link">User manual</a>
                     </div>
                  </div>

                  <div className="col-lg-5 text-center mt-4 mt-lg-0">
                     {/* Featured Section */}
                     <div className="support-featured-card">
                        <h6 className="fw-bold mb-3">
                           <i className="fas fa-star text-warning me-2"></i>Featured Updates
                        </h6>
                        <div className="featured-item">
                           <i className="fas fa-circle-info text-primary me-2" style={{ fontSize: '0.7rem' }}></i>
                           <a href="#">Exclusion of F&O contracts on 8 securities from August 29, 2025</a>
                        </div>
                        <div className="featured-item">
                           <i className="fas fa-circle-info text-primary me-2" style={{ fontSize: '0.7rem' }}></i>
                           <a href="#">Revision in expiry day of Index and Stock derivatives contracts</a>
                        </div>
                        <div className="featured-item">
                           <i className="fas fa-circle-info text-primary me-2" style={{ fontSize: '0.7rem' }}></i>
                           <a href="#">New margin requirements effective from next quarter</a>
                        </div>
                     </div>

                     {/* Stats */}
                     <div className="row g-3 mt-3">
                        <div className="col-4">
                           <div className="support-mini-stat">
                              <div className="fw-bold text-white">24/7</div>
                              <small className="text-white-50">Support</small>
                           </div>
                        </div>
                        <div className="col-4">
                           <div className="support-mini-stat">
                              <div className="fw-bold text-white">&lt;2hr</div>
                              <small className="text-white-50">Response</small>
                           </div>
                        </div>
                        <div className="col-4">
                           <div className="support-mini-stat">
                              <div className="fw-bold text-white">98%</div>
                              <small className="text-white-50">Resolved</small>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default Hero;