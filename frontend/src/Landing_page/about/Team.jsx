import React from 'react';

function Team() {
   return (
      <section className="team-section py-5">
         <div className="container">
            <div className="text-center mb-5">
               <h2 className="section-title">People</h2>
               <p className="text-muted">The team behind Radha Trading</p>
            </div>
            <div className="row justify-content-center">
               <div className="col-lg-8">
                  <div className="team-card glass-card">
                     <div className="row align-items-center g-4">
                        <div className="col-md-4 text-center">
                           <div className="team-avatar-wrapper">
                              <img
                                 src="media/Mayuresh.png.jpeg"
                                 alt="Mayuresh Sarkale"
                                 className="team-avatar"
                              />
                              <div className="team-avatar-ring"></div>
                           </div>
                           <h4 className="mt-3 mb-1">Mayuresh Sarkale</h4>
                           <span className="team-role-badge">Founder & CEO</span>
                        </div>
                        <div className="col-md-8">
                           <p className="text-muted">
                              Mayuresh bootstrapped and founded Radha in 2025 to overcome the hurdles
                              he faced during his decade long stint as a trader. Today, Radha has
                              changed the landscape of the Indian broking industry.
                           </p>
                           <p className="text-muted">
                              He is a member of the SEBI Secondary Market Advisory Committee (SMAC)
                              and the Market Data Advisory Committee (MDAC).
                           </p>
                           <p className="text-muted mb-3">
                              Playing basketball is his zen. 🏀
                           </p>
                           <div className="team-social-links">
                              <a href="#" className="social-link-btn">
                                 <i className="fas fa-home me-1"></i> Homepage
                              </a>
                              <a href="#" className="social-link-btn">
                                 <i className="fas fa-comments me-1"></i> TradingQnA
                              </a>
                              <a href="#" className="social-link-btn">
                                 <i className="fab fa-twitter me-1"></i> Twitter
                              </a>
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

export default Team;