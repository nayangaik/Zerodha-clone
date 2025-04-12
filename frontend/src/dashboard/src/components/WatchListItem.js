// WatchListItem.js

import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp, MoreHoriz, BarChartOutlined } from '@mui/icons-material';
import { Tooltip, Grow } from "@mui/material";
// Removed unused import: import { positions } from '../data/data';

// Separate component for the arrow icon
const ChangeIndicator = ({ isDown }) => {
  // ... (keep existing code)
};

const WatchListItem = React.memo(({ stock, onBuyClick }) => { // Accept onBuyClick prop
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setShowWatchlistActions(true);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setShowWatchlistActions(false);
    setIsHovered(false);
  };

  const itemInfoStyle = {
    display: isHovered ? 'none' : 'block',
  };

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="watchlist-item"
    >
      <div className="item">
        <p className={stock.isDown ? 'down' : 'up' } style={{fontSize:"1.2em" , fontWeight:"500"}}>{stock.name}</p>
        <div className="itemInfo"  style={itemInfoStyle}>
          <span className="percent" >{stock.percent}</span>
          <ChangeIndicator isDown={stock.isDown} />
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {/* Pass stock and onBuyClick to WatchListActions */}
      {showWatchlistActions && <WatchListActions stock={stock} onBuyClick={onBuyClick} />}
    </li>
  );
});

// --- WatchListActions Component ---
const WatchListActions = ({ stock, onBuyClick }) => { // Accept stock and onBuyClick

  const handleBuy = () => {
    if (onBuyClick) {
      onBuyClick(stock); // Pass the specific stock data when opening the modal
    }
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          {/* Add onClick handler */}
          <button className="buy" onClick={handleBuy}>Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        {/* ... other buttons ... */}
         <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}

        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

// Export WatchListItem (if WatchListActions is in the same file)
export default WatchListItem;

