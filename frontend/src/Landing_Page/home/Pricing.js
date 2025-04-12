import React from 'react';



const Pricing = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h1 className="mb-3 fs-2">Unbeatable pricing</h1>
          <p>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            See Pricing{" "}
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
        <div className="col-2"></div>
        <div className="col-6  mb-5" style={{position:"relative" , right:"4em" , bottom:"3.2em"}}>
          <div className="row text-center">
            <div className="col p-2 border" >
              <h1 className="mb-5 text-center" style={{position:"relative" , left:"1.2em"}}>₹0</h1>
              <p className='mt-5 text-start'>
                Free equity delivery and
                direct mutual funds
              </p>
            </div>
            <div className="col p-3 border" style={{position:"relative" , left:"1.2em"}}>
              <h1 className="mb-5" style={{position:"relative" , left:"0.8em"}}>₹20</h1>
              <p className='mt-5 text-start' style={{position:"relative" , right:"2em" , top:"1.4em"}}>Intraday  <br/>and F&O</p>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default Pricing;
