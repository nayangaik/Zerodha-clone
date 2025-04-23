import React from 'react';





const Stats = () => {
  return (
   
      <div className='container mt-1 p-5'>
        <div className='row text-center p-5 gx-5' style={{position:"relative" , right:"10em"}} >
          <div className='col-6 p-5'>
            <h1 className='fs-2 text-start mb-5'>Trust with confidence</h1>
             <h2 className='fs-4  text-start '>Customer-first always</h2>
             <p className='text-start text-muted'> That's why 1.5+ crore customers trust Zerodha with ₹4.5+ lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.</p>

             <h2 className='fs-4  text-start'>No spam or gimmicks</h2>
             <p className='text-start text-muted'>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>

             <h2 className='fs-4  text-start'>The Zerodha universe</h2>
             <p className='text-start text-muted'> Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs</p>

             <h2 className='fs-4  text-start'>Do better with money</h2>
             <p className='text-start text-muted'>With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.</p>
          </div>
          <div className='col-6 p-5' style={{position:"relative" , left:"10em"}}>
              <img src='/media/images/ecosystem.png' alt='stats' style={{"width":"100%"}} />
              <div className='text-center p-5 mx-3'>
              <a href='' className='mx-5' style={{textDecoration:"none"}}>Explore Our Products  <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>   
              <a href = ' ' style={{textDecoration:"none"}}>Try Kite</a> 
              </div>
                    
            </div>
      </div>
      </div>
   
  );
}

export default Stats;
