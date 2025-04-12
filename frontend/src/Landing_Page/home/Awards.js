import React from "react";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5" style={{position:"relative" , right:"10em"}}>
          <img src="media/images/largestBroker.svg" />
        </div>
        <div className="col-6 p-5 ">
          <h1>Largest stock broker in India</h1>
          <p className="mb-5">
            2+ million Zerodha clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>
          <div className="row" style={{position:"relative" , right:"10em"}}>
            <div className="col-6" style={{position:"relative" , right:"3em"}}>
              <ul>
                <li  className='text-nowrap'>
                  <p>Futures and Options</p>
                </li>
                <li  className='text-nowrap'>
                  <p>Commodity derivatives</p>
                </li>
                <li  className='text-nowrap'>
                  <p>Currency derivatives</p>
                </li>
              </ul>
            </div>
            <div className="col-6" style={{position:"relative" , left:"3em"}}>
              <ul>
                <li className='text-nowrap'>
                  <p>Stocks & IPOs</p>
                </li>
                <li className='text-nowrap'>
                  <p>Direct mutual funds</p>
                </li>
                <li className='text-nowrap'>
                  <p>Bonds and Govt. Securities</p>
                </li>
              </ul>
            </div>
          </div >
          <img src="media/images/pressLogos.png" style={{ width: "90%" }} />
        </div>
      </div>
    </div>
  );
}

export default Awards;