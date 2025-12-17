import React from 'react';

function Brokarage() {
    return ( 
       <div className="container ">
       
            
              <div className="row p-5 mt-5 text-center border-top" >
            <div className="col-8 p-4 "> <a />
              <a href=""  > <h1 className="fs-5">Brokerage Calculator</h1>  </a> 
              <ul style={{ textAlign: "left", lineHeight: "2.5"}} className="text-muted fs-6">
                <li>Call & Trade and RMS auto-squareoff:Additional charges of 150 + GST per order </li>
                <li> Digital contract notes will sent vie e-mail</li>
                <li> Physical copies of contract notes, if required, shall be charged ₹20 per contract note. Courier charges apply</li>
                <li> For NRI account (PSI), 0.5% or ₹200 per executed order for equity (whichever is lower). </li>
                <li> If the account is in debt balance, any order placed will be charged ₹40 per excecuted instead of ₹20 per executed order.</li>
              </ul>
             </div>
            <div className="col-4 p-4"> 
              <a href="" > <h1 className="fs-5">List of charges</h1> </a>
              </div>
            
        </div>
       </div>
     );
}

export default Brokarage;