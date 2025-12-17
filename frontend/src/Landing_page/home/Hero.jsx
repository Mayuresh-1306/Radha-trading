import React from "react";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        {/* ✅ Corrected path: removed /images/ as per your folder structure */}
        <img 
          src="/media/homeHero.png" 
          alt="homeHero" 
          className="mb-5" 
          style={{ width: "70%", margin: "0 auto" }} 
        />
        <h1 className="mt-5">Invest in everything</h1>
        <p className="fs-4 text-muted">
          Online platform to invest in stocks, derivatives, mutual funds, and more
        </p>
        <button 
          className="p-2 btn btn-primary fs-5 mb-5" 
          style={{ width: "20%", margin: "0 auto", backgroundColor: "#387ed1", border: "none" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Hero;