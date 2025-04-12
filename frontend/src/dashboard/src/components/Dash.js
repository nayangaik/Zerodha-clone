// frontend/src/dashboard/src/components/Dash.js
import React from 'react';
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Holdings from "./Holdings";
import Funds from "./Funds";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
// Removed WatchList import as it's rendered in Home.js, not routed here

const Dash = () => {
  return (
    // Removed outer dashboard-container and content divs if Home.js handles layout
    // Ensure the parent component (Home.js) provides necessary layout styling
    <Routes>
      {/* Use index route for the default dashboard view */}
      <Route index element={<Summary />} />
      {/* Use relative paths for nested routes */}
      <Route path="orders" element={<Orders />} />
      <Route path="holdings" element={<Holdings />} />
      <Route path="positions" element={<Positions />} />
      {/* Check if funds should be nested under positions or directly under dashboard */}
      {/* If directly under dashboard: */}
      <Route path="funds" element={<Funds />} />
      {/* If nested under positions (less likely): <Route path="positions/funds" ... /> */}
      <Route path="apps" element={<Apps />} />
      {/* Optional: Add a catch-all within dashboard if needed */}
      {/* <Route path="*" element={<div>Dashboard Page Not Found</div>} /> */}
    </Routes>
  );
};

export default Dash;
