import React from "react";

const Hero = () => {
  return (
    
<section className="container-fluid bg-primary text-white py-5">
  <div className="container py-5">
    <div className="row gx-5"> <div className="col-md-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">Support Portal</h4>
        </div>
        <h1 className="fs-3 mb-3">
          Search for an answer or browse help topics to create a ticket
        </h1>
        <div className="input-group mb-3">
          <input type="text" className="form-control form-control-lg"  placeholder="Eg. how do I activate F&O , why is my order getting rejected ..." aria-label="Search" aria-describedby="search-button" />
          <button className="btn btn-light" type="button" id="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.414-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
        <div className="mt-3">
          <a href="#" className="btn btn-sm btn-outline-light me-2">Track account opening</a>
          <a href="#" className="btn btn-sm btn-outline-light me-2">Track segment activation</a>
          <a href="#" className="btn btn-sm btn-outline-light me-2">Intraday margins</a>
          <a href="#" className="btn btn-sm btn-outline-light">Kite user manual</a>
        </div>
      </div>
      <div className="col-md-2"></div>
      <div className="col-md-5">
        <div className="d-flex justify-content-end mb-4">
          <a href="#" className="text-white text-decoration-none fs-4">Track tickets</a>
        </div>
        <h1 className="fs-3 mb-3">Featured</h1>
        <ol className="list-unstyled">
          <li className="mb-2">
            <a href="#" className="text-white text-decoration-none">
              <span className="fw-bold">1.</span> Change in expiry day of NSE derivative contracts
              <br />
              from April 04, 2025. <span className="text-warning">[ Withheld ]</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-white text-decoration-none">
              <span className="fw-bold">2.</span> Adjustment of Futures and Options contracts of
              <br />
              SIEMENS
            </a>
          </li>
        </ol>
      </div>
    </div>
  </div>
</section>
  );
};

export default Hero;
