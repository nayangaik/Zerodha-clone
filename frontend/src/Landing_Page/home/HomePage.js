import React from 'react';

import Hero from './Hero.js'
import Award from './Awards.js'  
import Stats from './Stats.js'
import Pricing from './Pricing.js'
import Education from './Education.js'
import OpenAccount from '../OpenAccount.js'



const HomePage = () => {

  return (
     <>
      
       <Hero/>
       <Award/>
       <Stats/>
       <Pricing/>
       <Education/>
       <OpenAccount/>
      
     </>
  );
}

export default HomePage;
