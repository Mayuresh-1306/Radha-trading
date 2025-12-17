import React from 'react';

function Team() {
    return ( 
        <div className="container ">
        <div className="row p-5  mt-5 border-top">
            <h1 className=" text-center  ">
               People
            </h1>
             </div>
             <div className="row p-5 mt-5  text-muted " style={{ lineHeight:"1.8", fontSize: "1.2em"}}>
            <div className="col-4 p-5 text-centre"> 
               <img src="media/Mayuresh.png.jpeg" style={{ borderRadius: "100%", width: "70%"}} />
               <br /> <br />
               <h4>Mayuresh Sarkale</h4>
               <h6>Founder, CEO</h6>
            </div>
             <div className="col-8 p-5">
             <p>Mayuresh bootstrapped and founded Radha in 2025 to overcome the hurdles he faced during his decade long stint as a trader. Today, Radha has changed the landscape of the Indian broking industry.</p>

<p>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>

<p>Playing basketball is his zen.</p>

<p>Connect on <a href="">Homepage </a> /<a href="">TradingQnA </a> /<a href="">Twitter</a> </p>
             </div>
        </div>
       </div>
     );
}

export default Team;