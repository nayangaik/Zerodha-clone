import React from 'react'

const Rightsection = ({ imageURL, productName, productDesription, learnMore }) => {
  return (
    <div className="container mt-5">
    <div className="row">
      <div className="col-6 p-5 mt-5" style={{position:"relative" , right:"4em"}}>
        <h1>{productName}</h1>
        <p>{productDesription}</p>
        <div>
          <a href={learnMore}>Learn More</a>
        </div>
      </div>
      <div className="col-6" style={{position:"relative" , left:"1em"}}>
        <img src={imageURL} />
      </div>
    </div>
  </div>
  )
}

export default Rightsection
