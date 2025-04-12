import React from 'react'
import { Link } from "react-router-dom";
import './Funds.css'

const Funds = () => {
  return (
    <>
    
          <span className='span'>
            <p>Equity</p>
          </span>

      <div className="row">
        <div className="col">
         
         <div className="tables-container">
            <table className="funds-table">
              <tbody>
                <tr className="data">
                  <td>Available margin</td>
                  <td className="imp colored">4,043.10</td>
                </tr>
                <tr className="data">
                  <td>Used margin</td>
                  <td className="imp">3,757.30</td>
                </tr>
                <tr className="data">
                  <td>Available cash</td>
                  <td className="imp">4,043.10</td>
                </tr>
                <tr className="data">
                  <td>Opening Balance</td>
                  <td>4,043.10</td>
                </tr>
              </tbody>
            </table>

            <table className="funds-table">
              <tbody>
                <tr className="data">
                  <td>Delivery margin</td>
                  <td>0.00</td>
                </tr>
                <tr className="data">
                  <td>Options premium</td>
                  <td>0.00</td>
                </tr>
                <tr className="data">
                  <td>Collateral (Liquid funds)</td>
                  <td>0.00</td>
                </tr>
                <tr className="data">
                  <td>Collateral (Equity)</td>
                  <td>0.00</td>
                </tr>
                <tr className="data">
                  <td>Total Collateral</td>
                  <td>0.00</td>
                </tr>
              </tbody>
            </table>

            <table className="funds-table">
              <tbody>
              <tr className="data">
                  <td>Exposure</td>
                  <td>0.00</td>
                </tr>
                <tr className="data">
                  <td>SPAN</td>
                  <td>0.00</td>
                </tr>
                <tr className="data">
                  <td>Payin</td>
                  <td>4064.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
     </div>  

        <div className="footer">
            <div className="col">
              <div className="commodity">
               <p>You don't have a commodity account</p>
               <Link className="btn btn-blue">Open Account</Link>
              </div>
           </div>
     
         <div className="funds">
             <p>Instant, zero-cost fund transfers with UPI </p>
             <div className='links'>
                <Link className="btn btn-green">Add funds</Link>
                <Link className="btn btn-blue">Withdraw</Link>
             </div>
         </div>
       </div>
    </>
  )
}

export default Funds
