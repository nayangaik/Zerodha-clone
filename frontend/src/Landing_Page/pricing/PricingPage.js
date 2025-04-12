import React from 'react'
import Brokerage from './Brokerage.js'
import Hero from './Hero.js'
import OpenAccount from '../OpenAccount.js'





const PricingPage = () => {
  return (
    <>
      
       <Hero/>
      <div style={{"position":"relative" , right:"4em" , bottom:"3.2em"}}>
       <OpenAccount />
      </div>
       <Brokerage/>

    </>  
    )
}

export default PricingPage
