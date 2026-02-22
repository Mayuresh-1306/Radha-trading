import React from 'react';

function Hero() {
    return (
        <section className="about-hero-section">
            <div className="about-hero-gradient">
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <div className="hero-badge mb-3">
                            <span className="badge-glow">🏢 About Radha Trading</span>
                        </div>
                        <h1 className="about-hero-title text-white">
                            We pioneered the discount broking model in India.
                            <br />
                            <span className="text-white-50">Now, we are breaking ground with our technology.</span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-6">
                        <div className="about-story-card">
                            <div className="story-timeline">
                                <div className="timeline-dot"></div>
                                <div className="timeline-line"></div>
                            </div>
                            <div className="story-content">
                                <div className="story-year-badge">Est. 2010</div>
                                <h4 className="mb-3">Our Beginning</h4>
                                <p className="text-muted">
                                    We kick-started operations on the 15th of August, 2010 with the goal of breaking
                                    all barriers that traders and investors face in India in terms of cost, support,
                                    and technology. We named the company Radha — the word meaning wealth.
                                </p>
                                <p className="text-muted">
                                    Today, our disruptive pricing models and in-house technology have made us
                                    the biggest stock broker in India.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-story-card">
                            <div className="story-timeline">
                                <div className="timeline-dot dot-blue"></div>
                                <div className="timeline-line"></div>
                            </div>
                            <div className="story-content">
                                <div className="story-year-badge badge-blue">Today</div>
                                <h4 className="mb-3">Our Impact</h4>
                                <p className="text-muted">
                                    Over 1.6+ crore clients place billions of orders every year through our powerful
                                    ecosystem of investment platforms, contributing over 15% of all Indian retail
                                    trading volumes.
                                </p>
                                <p className="text-muted">
                                    In addition, we run several popular open online educational and community
                                    initiatives to empower retail traders and investors.
                                    <a href="#" className="ms-1" style={{ textDecoration: "none" }}>Rainmatter</a>,
                                    our fintech fund and incubator, has invested in several fintech startups
                                    with the goal of growing the Indian capital markets.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;