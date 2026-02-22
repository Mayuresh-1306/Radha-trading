import React from 'react';

function Awards() {
    const tradingOptions = [
        { icon: "fas fa-chart-bar", title: "Futures & Options", desc: "Trade F&O with flat ₹20 per order" },
        { icon: "fas fa-coins", title: "Commodity Derivatives", desc: "MCX and NCDEX trading available" },
        { icon: "fas fa-globe", title: "Currency Derivatives", desc: "Trade forex pairs seamlessly" },
        { icon: "fas fa-building", title: "Stocks & IPOs", desc: "Zero brokerage on equity delivery" },
        { icon: "fas fa-hand-holding-usd", title: "Direct Mutual Funds", desc: "Commission-free MF investments" },
        { icon: "fas fa-seedling", title: "Bonds & Growth", desc: "Fixed income for steady returns" }
    ];

    return (
        <section className="awards-section py-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-5 mb-4 mb-lg-0 text-center">
                        <div className="awards-image-wrapper">
                            <img src='media/largestBroker.svg' alt='Award — Largest Broker' className="awards-image" />
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <h2 className="section-title mb-2">
                            Largest Stock Broker in India
                        </h2>
                        <p className="section-subtitle mb-4">
                            2+ million clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:
                        </p>
                        <div className="row g-3">
                            {tradingOptions.map((opt, i) => (
                                <div className="col-md-6" key={i}>
                                    <div className="trading-option-card">
                                        <div className="option-icon">
                                            <i className={opt.icon}></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1">{opt.title}</h6>
                                            <small className="text-muted">{opt.desc}</small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <img src='media/pressLogos.png' alt="Press logos" className="press-logos" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Awards;