// Example structure for Home.js
import React from 'react';
import TopBar from './TopBar';
import WatchList from './WatchList';
import Dash from './Dash';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <TopBar />
      <div className="main-content">
        <WatchList />
        {/* Add a wrapper div for the Dash component area */}
        <div className="dashboard-main-area">
          <Dash />
        </div>
      </div>
    </div>
  );
};
export default Home;
