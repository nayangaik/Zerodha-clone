import React from 'react'



const Footer = () => {
  return (

    <div className='container border-top py-5'> {/* Added py-5 for vertical padding */}
    <div className='row gx-md-5'> {/* Added gx-md-5 for horizontal spacing between columns on medium and up */}
      <div className='col-md-3 mb-4 mb-md-0' style={{position:"relative" , right:"8em"}}> {/* Fixed width on medium and up, added margin-bottom for stacking on small */}
        <img src='media/images/logo.svg' style={{"width":"70%"}} alt='logo'/> {/* Used Bootstrap's w-60 class */}
        <p className='mt-3 text-muted'>&copy;2010 - 2025, Zerodha Broking Ltd.<br/>All rights reserved.</p> {/* Added <br/> for better wrapping */}
      </div>
      <div className='col-md-3 mb-5 mb-md-0'>
        <p className='mb-4 fs-5'>Company</p>
        <a href='' className='text-decoration-none text-dark mb-2 d-block' >About</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block' >Products</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block' >Pricing</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block' >Referral programme</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block' >Careers</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block' >Zerodha.tech</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block' >Open source</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block' >Press & media</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block' >Zerodha Cares (CSR)</a>
      </div>
      <div className='col-md-3 mb-5 mb-md-0'>
        <p className='mb-4 fs-5'>Support</p>
        <a href='' className='text-decoration-none text-dark mb-2 d-block'>Contact us</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block'>Support portal</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block'>Z-Connect blog</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block'>List of charges</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block'>Downloads & resources</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block'>Videos</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block'>Market overview</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block'>How to file a complaint?</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block'>Status of your complaints</a>
      </div>
      <div className='col-md-3'>
        <p className='mb-4 fs-5'>Account</p>
        <a href='' className='text-decoration-none text-dark mb-2 d-block'> Open an account</a>
        <a href='' className='text-decoration-none text-dark mb-2 d-block'>Fund transfer</a>
      </div>
    </div>
    <div className='mt-4 text-muted text-small'> {/* Added mt-4 for spacing from the columns */}
      <p className="text-muted">Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI Registration no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF</p>
      <p className="text-muted">Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances</p>
      <a href='' >Smart Online Dispute Resolution | Grievances Redressal Mechanism</a>
      <p>Investments in securities market are subject to market risks; read all the related documents carefully before investing.</p>
      <p className="text-muted">Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month. </p>
      <p className="text-muted">"Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please create a ticket here. </p>
    </div>
  </div>
                  
                


  )
}

export default Footer
