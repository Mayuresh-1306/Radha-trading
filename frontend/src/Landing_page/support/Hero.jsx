import React from 'react';

function Hero() {
    return ( 
       <section className="container-fluid " id="SupportHero">
        <div class="container">
        <div className=" p-3 mt-3 mb-3" id="SupportWrapper">
            <h4 > Support Portal </h4>
             <a href="" >Track Tickets</a>
             </div>
              <div className="row p-3 mt-3 mb-3 m-3" >
                 <div className="col-6 p-3" >
                    <h1 className="fs-3">Search for an answer or browse help topics to create a ticket</h1><br />
                    <input placeholder="Eg. how do I activate F&O" /> <br />
                     <a href="" >Track account opening</a>
                      <a href="" > Track segment activation</a>
                     <a href="" > Intraday margins</a> <br />
                      <a href="" >Kite user manual</a>
                 </div>
                  <div className="col-6 p-3" >
                   <h1 className="fs-3">Featured</h1> <br />
                   <ol>
                    <li> <a href="" >Exclusion of F&O contracts on 8 securities from August 29, 2025</a></li><br />
                     <li> <a href="" > Revision in expiry day of Index and Stock derivatives contracts</a></li>
                   </ol>
                  
                  </div>
           
             </div>
             </div>
              </section>
     );
}

export default Hero;