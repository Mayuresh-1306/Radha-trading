import React from 'react';

function Stats() {
  const features = [
    {
      icon: "fas fa-heart",
      title: "Customer-first always",
      desc: "That's why 1.6+ crore customers trust Radha with ~₹6 lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.",
      color: "#ef4444"
    },
    {
      icon: "fas fa-ban",
      title: "No spam or gimmicks",
      desc: "No gimmicks, spam, \"gamification\", or annoying push notifications. High quality apps that you use at your pace, the way you like.",
      color: "#8b5cf6"
    },
    {
      icon: "fas fa-rocket",
      title: "The Radha universe",
      desc: "Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.",
      color: "#3b82f6"
    },
    {
      icon: "fas fa-piggy-bank",
      title: "Do better with money",
      desc: "With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.",
      color: "#10b981"
    }
  ];

  return (
    <section className="stats-section py-5">
      <div className="container">
        <div className="row align-items-start">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className="section-title mb-3">Trust with confidence</h2>
            <div className="row g-3">
              {features.map((f, i) => (
                <div className="col-md-6" key={i}>
                  <div className="feature-card glass-card">
                    <div className="feature-icon-circle" style={{ background: `${f.color}15`, color: f.color }}>
                      <i className={f.icon}></i>
                    </div>
                    <h5 className="mt-3 mb-2">{f.title}</h5>
                    <p className="text-muted small mb-0">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <img src='media/ecosystem.png' alt="Radha ecosystem" className="ecosystem-image" />
            <div className="d-flex justify-content-center gap-4 mt-4">
              <a href='/products' className="explore-link">
                Explore our products <i className="fas fa-arrow-right ms-1"></i>
              </a>
              <a href='/dashboard' className="explore-link">
                Try Dashboard <i className="fas fa-arrow-right ms-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;