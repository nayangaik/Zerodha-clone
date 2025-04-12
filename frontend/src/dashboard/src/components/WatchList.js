// frontend/src/dashboard/src/components/WatchList.js

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
// --- Import the static data ---
// Adjust the path if data.js is located elsewhere relative to WatchList.js
import { watchlist } from '../data/data';
import './WatchList.css';
import BuyStockModal from './BuyStockModal'; // Make sure BuyStockModal is imported
import WatchListItem from './WatchListItem'; // Import WatchListItem

const WatchList = () => {
  const { authToken } = useContext(AuthContext);
  // Initialize state with the imported static data
  const [watchlistData, setWatchlistData] = useState(watchlist); // Use static data directly
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  // Removed buyQty and buyPrice state as they are managed in the modal now
  const [buyError, setBuyError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Add submitting state

  // --- No useEffect needed if using static data directly for initialization ---
  // If fetching from API later, you would use useEffect:
  /*
  useEffect(() => {
    const fetchWatchlist = async () => {
      // Fetch logic here...
      // setWatchlistData(fetchedData);
    };
    fetchWatchlist();
  }, []); // Empty dependency array to run once on mount
  */

  const handleOpenBuyModal = (stock) => {
    setSelectedStock(stock);
    setBuyError(''); // Clear previous errors
    setShowBuyModal(true);
  };

  const handleCloseBuyModal = () => {
    setShowBuyModal(false);
    setSelectedStock(null);
  };

  // --- handleConfirmBuy function remains the same ---
  const handleConfirmBuy = async (orderDetails) => { // Receive details from modal
    setBuyError('');
    setIsSubmitting(true); // Set submitting state

    // Basic check (modal handles quantity validation)
    if (!selectedStock) {
      setIsSubmitting(false);
      return; // Should not happen if modal opened correctly
    }

    if (!authToken) {
      setBuyError("Authentication error. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = 'http://localhost:3002/api/orders';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedStock.name,
          qty: orderDetails.quantity, // Use quantity from modal
          price: orderDetails.price,   // Use price from modal/stock
          mode: 'BUY',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      console.log('Buy order successful:', result);
      handleCloseBuyModal();
      // TODO: Add logic to refresh Orders data or show success message

    } catch (err) {
      console.error('Failed to place buy order:', err);
      // Propagate error back to modal or handle globally
      // For now, just log it, modal might show its own error
      setBuyError(err.message || 'Failed to place order. Please try again.');
      // Re-throw error so modal knows it failed
      throw err;
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  // --- JSX for Watchlist and Modal ---
  return (
    <div className="watchlist-container">
      {/* Add Search Bar if needed */}
      <div className="search-bar" style={{marginBottom:"2.5em" , position:"relative" , top:"0.15em"}}>
        <input type="text" placeholder="Search eg: infy bse, nifty fut" />
        <span className="count">{watchlistData.length} / 50</span>
      </div>

      {/* Render WatchListItems */}
      <ul className="list">
        {watchlistData.map((item) => (
          // Pass handleOpenBuyModal via onBuyClick prop
          <WatchListItem key={item.name} stock={item} onBuyClick={handleOpenBuyModal} />
        ))}
      </ul>

      {/* --- Render Buy Modal --- */}
      {/* Pass necessary props to BuyStockModal */}
      <BuyStockModal
        open={showBuyModal}
        onClose={handleCloseBuyModal}
        stock={selectedStock}
        onConfirmBuy={handleConfirmBuy} // Pass the function that makes the API call
      />
    </div>
  );
};

export default WatchList;
