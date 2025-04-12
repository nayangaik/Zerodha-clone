import React from 'react';



const Education = () => {
  return (
   
       
  <div className="container mt-5">
    <div className='row '>
        <div className='col-6' style={{position:"relative" , right:"10em"}}>
           
           <img src='media/images/education.svg' alt='education' className='mb-5'/>
                      
        </div>
        
                <div className='col-6 mt-5'>
             
                  <h1 className='mb-4'>Free and open market education</h1>
                  <p className='mt-5 '>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                  <a href="" style={{ textDecoration: "none", fontSize: "1.2rem" }}>Varsity <i className="fa fa-long-arrow-right ms-2 mb-4" aria-hidden="true"></i></a>


                  
                  <p>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                  <a href="" style={{ textDecoration: "none" , fontSize: "1.2rem" }}>TradingQ&A <i class="fa fa-long-arrow-right ms-2 " aria-hidden="true"></i></a>

                 </div>

             
        
    </div>
 </div>
    
  );
}

export default Education;
