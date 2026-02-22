import React from 'react';

function CreateTickets() {
  const topics = [
    {
      icon: 'fas fa-user-plus',
      title: 'Account Opening',
      color: '#667eea',
      links: ['Resident Individual', 'Minor', 'Non Resident Indian (NRI)', 'Company, Partnership, HUF, LLP', 'Glossary'],
    },
    {
      icon: 'fas fa-building',
      title: 'Radha Account',
      color: '#8b5cf6',
      links: ['Your Profile', 'Account Modification', 'Client Master Report (CMR) & DP', 'Nomination', 'Transfer & Conversion of Securities'],
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Trading Platform',
      color: '#10b981',
      links: ['IPO', 'Trading FAQs', 'Margin Trading Facility (MTF)', 'Charts & Orders', 'Alerts & Nudges'],
    },
    {
      icon: 'fas fa-wallet',
      title: 'Funds',
      color: '#f59e0b',
      links: ['Add Money', 'Withdraw Money', 'Add Bank Accounts', 'eMandates', 'Payment Issues'],
    },
    {
      icon: 'fas fa-desktop',
      title: 'Console',
      color: '#3b82f6',
      links: ['Portfolio', 'Corporate Actions', 'Funds Statement', 'Reports', 'Profile & Segments'],
    },
    {
      icon: 'fas fa-coins',
      title: 'Mutual Funds',
      color: '#ec4899',
      links: ['Mutual Fund Orders', 'National Pension Scheme (NPS)', 'Features on Coin', 'Payments & Redemption', 'General'],
    },
  ];

  return (
    <section className="support-topics-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">Create a Support Ticket</h2>
          <p className="text-muted">Select a relevant topic to get started</p>
        </div>

        <div className="row g-4">
          {topics.map((topic, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="support-topic-card">
                <div className="topic-card-header">
                  <div className="topic-icon-circle" style={{ background: `${topic.color}15`, color: topic.color }}>
                    <i className={topic.icon}></i>
                  </div>
                  <h5 className="mb-0 fw-bold">{topic.title}</h5>
                </div>
                <div className="topic-links">
                  {topic.links.map((link, j) => (
                    <a href="#" className="topic-link" key={j}>
                      <i className="fas fa-chevron-right me-2" style={{ fontSize: '0.6rem', color: topic.color }}></i>
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="row g-4 mt-5">
          <div className="col-md-4">
            <div className="contact-method-card text-center">
              <div className="contact-icon-circle">
                <i className="fas fa-phone"></i>
              </div>
              <h6 className="fw-bold mt-3">Call Us</h6>
              <p className="text-muted small mb-2">Mon–Sat, 9AM–6PM</p>
              <a href="tel:+911234567890" className="btn btn-sm btn-outline-primary">+91 123 456 7890</a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-method-card text-center">
              <div className="contact-icon-circle">
                <i className="fas fa-envelope"></i>
              </div>
              <h6 className="fw-bold mt-3">Email Us</h6>
              <p className="text-muted small mb-2">We respond within 2 hours</p>
              <a href="mailto:support@radhatrading.com" className="btn btn-sm btn-outline-primary">support@radhatrading.com</a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-method-card text-center">
              <div className="contact-icon-circle">
                <i className="fas fa-comments"></i>
              </div>
              <h6 className="fw-bold mt-3">Live Chat</h6>
              <p className="text-muted small mb-2">Available 24/7</p>
              <button className="btn btn-sm btn-primary">Start Chat</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateTickets;