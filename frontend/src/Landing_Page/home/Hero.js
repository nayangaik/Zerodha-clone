import React from 'react';

const Hero = () => {
  return (
    
      <div className='container  p-5 mb-5'style={{"position":"relative" , right:"2.9em"}}>

          <div className='row text-center'>
              
               
                 <img src='media/images/homeHero.png' alt='homeHero' className='mb-5'/>

                   <h1 className='mt-5'> Invest in everything </h1>
                   <p> Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more. </p>
                   <button className='p-2 btn btn-primary fs-5 mb-5' style={{width:"19%", margin:"0 auto"}}>Sign up for free</button>

                
          </div>
      </div>
   
  );
}

export default Hero;
