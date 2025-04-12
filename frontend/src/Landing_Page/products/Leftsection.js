import React from 'react'

const Leftsection = ({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6" style={{position:"relative" , right:"4em"}}>
          <img src={imageURL} />
        </div>
        <div className="col-6 p-5 mt-5"  style={{position:"relative" , left:"4em"}}>
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div>
            <a href={tryDemo}>Try Demo</a>
            <a href={learnMore} style={{ marginLeft: "50px" }}>
              Learn More
            </a>
          </div>
          <div className="mt-3">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg" />
            </a>
            <a href={appStore}>
              <img
                src="media/images/appstoreBadge.svg"
                style={{ marginLeft: "50px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leftsection
