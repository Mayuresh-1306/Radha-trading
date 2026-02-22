import React from 'react';

function Values() {
    const values = [
        {
            icon: "fas fa-lightbulb",
            title: "Innovation",
            desc: "Constantly pushing the boundaries of trading technology to give our users the best possible experience.",
            color: "#f59e0b"
        },
        {
            icon: "fas fa-eye",
            title: "Transparency",
            desc: "Zero hidden charges, clear pricing, and open-source educational resources for every investor.",
            color: "#3b82f6"
        },
        {
            icon: "fas fa-graduation-cap",
            title: "Education",
            desc: "Empowering millions through Varsity — the world's largest free online stock market education platform.",
            color: "#10b981"
        },
        {
            icon: "fas fa-users",
            title: "Community",
            desc: "Building India's most active trading community through TradingQ&A and open market initiatives.",
            color: "#8b5cf6"
        }
    ];

    return (
        <section className="values-section py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section-title">Our Values</h2>
                    <p className="text-muted">The principles that drive everything we do</p>
                </div>
                <div className="row g-4">
                    {values.map((v, i) => (
                        <div className="col-md-6 col-lg-3" key={i}>
                            <div className="value-card">
                                <div className="value-icon-circle" style={{ background: `${v.color}15`, color: v.color }}>
                                    <i className={v.icon}></i>
                                </div>
                                <h5 className="mt-3 mb-2">{v.title}</h5>
                                <p className="text-muted small mb-0">{v.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Values;
