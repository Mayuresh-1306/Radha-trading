import React from "react";

const ProductPage = () => {
  const products = [
    {
      id: 1,
      name: "Stock Trading",
      icon: "fas fa-chart-line",
      description: "Trade stocks with zero commission and advanced tools",
      features: ["Zero commission", "Real-time data", "Advanced charts", "Margin trading"]
    },
    {
      id: 2,
      name: "Mutual Funds",
      icon: "fas fa-money-bill-wave",
      description: "Invest in professionally managed mutual funds",
      features: ["SIP available", "Diverse portfolios", "Tax saving", "Auto-invest"]
    },
    {
      id: 3,
      name: "Derivatives",
      icon: "fas fa-exchange-alt",
      description: "Trade futures and options with advanced analytics",
      features: ["F&O trading", "Options chain", "Greeks calculator", "Strategy builder"]
    },
    {
      id: 4,
      name: "IPO",
      icon: "fas fa-rocket",
      description: "Apply for IPOs and invest in new companies",
      features: ["Easy application", "ASBA support", "Track applications", "IPO analytics"]
    },
    {
      id: 5,
      name: "Bonds & ETFs",
      icon: "fas fa-landmark",
      description: "Invest in government bonds and ETFs",
      features: ["Government bonds", "Corporate bonds", "Gold ETFs", "International ETFs"]
    },
    {
      id: 6,
      name: "Advisory Services",
      icon: "fas fa-user-tie",
      description: "Get expert advisory and portfolio management",
      features: ["Personal advisor", "Portfolio review", "Risk analysis", "Wealth planning"]
    }
  ];

  return (
    <div className="product-page">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Our Products</h1>
              <p className="lead mb-4">
                Discover our comprehensive suite of investment products designed 
                for both beginners and experienced investors.
              </p>
              <div className="d-flex gap-3">
                <a href="/signup" className="btn btn-light btn-lg">
                  Start Investing
                </a>
                <a href="/pricing" className="btn btn-outline-light btn-lg">
                  View Pricing
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <i className="fas fa-boxes fa-10x opacity-50"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {products.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6">
                <div className="card h-100 border-0 shadow-lg product-card">
                  <div className="card-body p-4">
                    <div className="text-center mb-4">
                      <div className="icon-wrapper bg-primary bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center p-3">
                        <i className={`${product.icon} fa-3x text-white`}></i>
                      </div>
                    </div>
                    
                    <h3 className="card-title text-center h4 mb-3">{product.name}</h3>
                    <p className="card-text text-center text-muted mb-4">
                      {product.description}
                    </p>
                    
                    <div className="product-features">
                      <h6 className="mb-3">Key Features:</h6>
                      <ul className="list-unstyled">
                        {product.features.map((feature, index) => (
                          <li key={index} className="mb-2">
                            <i className="fas fa-check text-success me-2"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card-footer bg-transparent border-top-0 text-center pt-0">
                    <a 
                      href="/signup" 
                      className="btn btn-outline-primary stretched-link"
                    >
                      Get Started
                      <i className="fas fa-arrow-right ms-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-light py-5">
        <div className="container text-center py-5">
          <h2 className="mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="lead mb-4">
            Join 1.42L+ investors who trust us with their investments.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <a href="/signup" className="btn btn-primary btn-lg px-5">
              <i className="fas fa-user-plus me-2"></i>
              Sign Up Free
            </a>
            <a href="/support" className="btn btn-outline-primary btn-lg px-5">
              <i className="fas fa-headset me-2"></i>
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;