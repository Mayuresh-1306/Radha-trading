import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('free');

  const plans = [
    {
      id: 'free',
      name: 'Basic Plan',
      tagline: 'Perfect for beginners',
      price: '₹0',
      period: 'per month',
      features: [
        'Free equity delivery trades',
        'Direct mutual funds',
        'Basic research tools',
        'Email support',
        '1 Demat account',
        'Up to ₹10,000 investment'
      ],
      cta: 'Start Free',
      popular: false,
      color: 'primary'
    },
    {
      id: 'pro',
      name: 'Pro Trader',
      tagline: 'For active traders',
      price: '₹999',
      period: 'per month',
      features: [
        'Unlimited equity delivery',
        '₹20 per F&O trade',
        'Advanced charts & tools',
        'Priority phone support',
        'Up to 3 Demat accounts',
        'API access',
        'Margin trading facility',
        'Daily research reports'
      ],
      cta: 'Upgrade to Pro',
      popular: true,
      color: 'success'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'For institutions & HNI',
      price: 'Custom',
      period: 'tailored pricing',
      features: [
        'All Pro features included',
        'Dedicated relationship manager',
        'Custom API solutions',
        '24/7 premium support',
        'Unlimited Demat accounts',
        'Bulk order facilities',
        'Advanced risk management',
        'White label solutions'
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'warning'
    }
  ];

  const brokerageDetails = [
    {
      type: 'Equity Delivery',
      free: 'Free',
      pro: 'Free',
      enterprise: 'Free'
    },
    {
      type: 'Intraday Equity',
      free: '0.03% or ₹20',
      pro: '0.02% or ₹20',
      enterprise: '0.01% or ₹20'
    },
    {
      type: 'F&O',
      free: '₹50',
      pro: '₹20',
      enterprise: '₹15'
    },
    {
      type: 'Currency',
      free: '₹40',
      pro: '₹25',
      enterprise: '₹20'
    },
    {
      type: 'Commodity',
      free: '₹60',
      pro: '₹35',
      enterprise: '₹25'
    }
  ];

  const additionalCharges = [
    'DP Charges: ₹15.93 + GST per ISIN per month (charged quarterly)',
    'Transaction Charges: 0.00325% of turnover (charged by exchange)',
    'STT/CTT: As per government regulations',
    'GST: 18% on brokerage and transaction charges',
    'SEBI Charges: ₹10 per crore (max ₹150)',
    'Stamp Duty: As per state regulations'
  ];

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">Unbeatable Pricing</h1>
              <p className="lead mb-4">
                We pioneered discount broking in India. Transparent pricing with zero hidden charges.
                Join <span className="fw-bold">1.42L+</span> investors who trust us.
              </p>
              <div className="d-flex flex-wrap gap-3 align-items-center">
                <Link to="/signup" className="btn btn-light btn-lg px-4">
                  Open Free Account
                </Link>
                <a href="#compare" className="btn btn-outline-light btn-lg px-4">
                  Compare Plans
                </a>
              </div>
            </div>
            <div className="col-lg-4 text-center">
              <div className="stats-card bg-white text-dark rounded-3 p-4 shadow-lg">
                <div className="display-3 fw-bold text-primary">₹20</div>
                <h5 className="mb-3">Per F&O Trade</h5>
                <div className="d-flex justify-content-center gap-4">
                  <div className="text-center">
                    <div className="h4 mb-0">30</div>
                    <small className="text-muted">Free Delivery</small>
                  </div>
                  <div className="text-center">
                    <div className="h4 mb-0">0</div>
                    <small className="text-muted">Account Fees</small>
                  </div>
                  <div className="text-center">
                    <div className="h4 mb-0">0</div>
                    <small className="text-muted">AMC</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Choose Your Plan</h2>
            <p className="lead text-muted">Select the perfect plan for your trading journey</p>
          </div>

          <div className="row g-4 justify-content-center">
            {plans.map((plan) => (
              <div key={plan.id} className="col-lg-4 col-md-6">
                <div className={`card h-100 border-0 shadow-lg hover-shadow transition-all ${
                  plan.popular ? 'border-primary border-2' : ''
                }`}>
                  {plan.popular && (
                    <div className="ribbon ribbon-top-right">
                      <span className="bg-primary text-white">MOST POPULAR</span>
                    </div>
                  )}
                  
                  <div className="card-header bg-white border-0 pt-4">
                    <div className="text-center">
                      <h3 className={`h2 fw-bold text-${plan.color}`}>{plan.name}</h3>
                      <p className="text-muted mb-3">{plan.tagline}</p>
                      
                      <div className="price-display mb-3">
                        <span className="display-3 fw-bold">{plan.price}</span>
                        <span className="text-muted">/{plan.period}</span>
                      </div>
                      
                      <Link 
                        to={plan.id === 'enterprise' ? '/contact' : '/signup'}
                        className={`btn btn-${plan.color} btn-lg w-100`}
                      >
                        {plan.cta}
                      </Link>
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <ul className="list-unstyled mb-0">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="mb-3 d-flex align-items-start">
                          <i className={`fas fa-check text-${plan.color} me-2 mt-1`}></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brokerage Comparison Table */}
      <section id="compare" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Detailed Brokerage Charges</h2>
            <p className="text-muted">Transparent pricing across all segments</p>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th className="ps-4">Segment</th>
                      <th className="text-center">Basic Plan</th>
                      <th className="text-center">Pro Trader</th>
                      <th className="text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brokerageDetails.map((item, index) => (
                      <tr key={index}>
                        <td className="ps-4 fw-medium">{item.type}</td>
                        <td className="text-center">
                          <span className="badge bg-light text-dark">{item.free}</span>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-success text-white">{item.pro}</span>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-warning text-dark">{item.enterprise}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="alert alert-info mt-4">
            <h5 className="alert-heading">
              <i className="fas fa-info-circle me-2"></i>
              Note: All charges are per executed order
            </h5>
            <p className="mb-0">
              *Minimum brokerage of ₹20 applicable for intraday, F&O, currency and commodity trades
            </p>
          </div>
        </div>
      </section>

      {/* Additional Charges */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-white">
                  <h4 className="mb-0">
                    <i className="fas fa-file-invoice-dollar me-2 text-primary"></i>
                    Additional Charges
                  </h4>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled mb-0">
                    {additionalCharges.map((charge, index) => (
                      <li key={index} className="mb-2 d-flex align-items-start">
                        <i className="fas fa-circle text-primary fa-xs me-2 mt-2"></i>
                        <span>{charge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-white">
                  <h4 className="mb-0">
                    <i className="fas fa-percentage me-2 text-success"></i>
                    Calculator Tools
                  </h4>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="d-grid">
                        <Link to="/brokerage-calculator" className="btn btn-outline-primary">
                          <i className="fas fa-calculator me-2"></i>
                          Brokerage Calculator
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-grid">
                        <Link to="/charges" className="btn btn-outline-success">
                          <i className="fas fa-list me-2"></i>
                          List of Charges
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-grid">
                        <Link to="/margin-calculator" className="btn btn-outline-info">
                          <i className="fas fa-chart-line me-2"></i>
                          Margin Calculator
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-grid">
                        <Link to="/tax-calculator" className="btn btn-outline-warning">
                          <i className="fas fa-coins me-2"></i>
                          Tax Calculator
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h6>Need Help Calculating?</h6>
                    <p className="text-muted small">
                      Our support team can help you understand all charges. 
                      <Link to="/support" className="text-decoration-none ms-1">
                        Contact support →
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted">Common questions about our pricing</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="accordion" id="pricingFAQ">
                {[
                  {
                    q: "Are there any hidden charges?",
                    a: "No, we believe in complete transparency. All charges are clearly mentioned in our contract note and on our website."
                  },
                  {
                    q: "What is the minimum account opening balance?",
                    a: "There is no minimum balance required to open an account. You can start trading with any amount."
                  },
                  {
                    q: "How are DP charges calculated?",
                    a: "DP charges are ₹15.93 + GST per ISIN per month, charged quarterly. If you hold multiple stocks, each ISIN is charged separately."
                  },
                  {
                    q: "Do you charge for call & trade?",
                    a: "Yes, call & trade orders attract an additional charge of ₹150 + GST per order. We encourage using our digital platforms for better rates."
                  },
                  {
                    q: "Are there any charges for account maintenance?",
                    a: "No, we don't charge any account maintenance charges (AMC) for the first year. From the second year, it's ₹400 + GST per year."
                  }
                ].map((faq, index) => (
                  <div key={index} className="accordion-item border-0 mb-3 shadow-sm">
                    <h3 className="accordion-header">
                      <button 
                        className="accordion-button collapsed" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target={`#faq${index}`}
                      >
                        {faq.q}
                      </button>
                    </h3>
                    <div id={`faq${index}`} className="accordion-collapse collapse" data-bs-parent="#pricingFAQ">
                      <div className="accordion-body">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-gradient-primary text-white">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="display-6 fw-bold mb-4">Start Trading Today</h2>
              <p className="lead mb-5">
                Join India's fastest growing brokerage platform. Open your account in just 5 minutes.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                <Link to="/signup" className="btn btn-light btn-lg px-5">
                  <i className="fas fa-user-plus me-2"></i>
                  Open Free Account
                </Link>
                <Link to="/contact" className="btn btn-outline-light btn-lg px-5">
                  <i className="fas fa-headset me-2"></i>
                  Talk to Sales
                </Link>
              </div>
              <p className="mt-4 mb-0">
                Need help choosing? Call us at <strong>1800-123-4567</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PricingPage;