import React from 'react';

function Education() {
  return (
    <section className="education-section py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-4 mb-lg-0 text-center">
            <img src='media/education.svg' alt='Market education' className="education-image" />
          </div>
          <div className="col-lg-7">
            <h2 className="section-title mb-4">Free and open market education</h2>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="edu-card">
                  <div className="edu-card-accent"></div>
                  <div className="edu-card-body">
                    <div className="edu-icon">
                      <i className="fas fa-book-open"></i>
                    </div>
                    <h5>Varsity</h5>
                    <p className="text-muted small">
                      The largest online stock market education book in the world covering everything from the basics to advanced trading.
                    </p>
                    <a href='/products' className="edu-link">
                      Learn More <i className="fas fa-arrow-right ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="edu-card">
                  <div className="edu-card-accent accent-green"></div>
                  <div className="edu-card-body">
                    <div className="edu-icon text-success">
                      <i className="fas fa-comments"></i>
                    </div>
                    <h5>TradingQ&A</h5>
                    <p className="text-muted small">
                      The most active trading and investment community in India for all your market related queries.
                    </p>
                    <a href='/support' className="edu-link edu-link-green">
                      Join Community <i className="fas fa-arrow-right ms-1"></i>
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

export default Education;