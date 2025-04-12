// frontend/src/dashboard/src/components/Positions.js

import React, { useState, useEffect, useContext } from 'react'; // Import useContext
import { AuthContext } from '../../../context/AuthContext'; // Import AuthContext
import './Holding.css'; // Assuming you want to reuse the same styles

const Positions = () => {
  // --- State Management ---
  const [positions, setPositions] = useState([]); // State for positions from DB
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { authToken } = useContext(AuthContext); // Get token from context

  // --- Fetch Data ---
  useEffect(() => {
    const fetchPositions = async () => {
      setIsLoading(true);
      setError(null);

      // Ensure token exists before fetching
      if (!authToken) {
        setError("Authentication token not found.");
        setIsLoading(false);
        return;
      }

      try {
        // Fetch from the backend API endpoint for positions
        // Use relative path (relies on proxy) or full path
        // const apiUrl = '/api/positions'; // Relative path
        const apiUrl = 'http://localhost:3002/api/positions'; // Full path

        const response = await fetch(apiUrl, {
          headers: {
            // Add the Authorization header
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (!response.ok) {
          // Handle HTTP errors
          let errorMsg = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMsg = errorData.message || errorMsg;
          } catch (parseError) {
             errorMsg = response.statusText || errorMsg;
          }
          // Handle specific auth errors
          if (response.status === 401 || response.status === 403) {
             errorMsg = `Authorization failed: ${errorMsg}`;
             // Consider logging out the user here if token is invalid/expired
             // logout();
          }
          throw new Error(errorMsg);
        }
        const data = await response.json();
        console.log("Fetched positions from DB:", data);
        setPositions(data); // Update state with fetched data
      } catch (err) {
        console.error("Failed to fetch positions:", err);
        setError(err.message || "Failed to load positions data."); // Set error state
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchPositions(); // Call fetch function on mount
  }, [authToken]); // Add authToken as dependency

  // --- Render Logic ---
  if (isLoading) {
    return <div className="loading">Loading positions...</div>;
  }

  if (error) {
    return <div className="error">Error fetching positions: {error}</div>;
  }

  // --- Calculations ---
  // Calculate total P&L for positions
  const totalPositionsPnL = positions.reduce((sum, position) => {
    // Use correct field names from schema: avgPrice, ltp
    const investment = (position.avgPrice || 0) * (position.qty || 0);
    const currentValue = (position.ltp || 0) * (position.qty || 0);
    return sum + (currentValue - investment);
  }, 0);

  return (
    <>
      {/* Use positions state variable */}
      <h3 className="title">Positions ({positions.length})</h3>

      {positions.length === 0 ? (
         <div className="no-positions"> {/* Add a message for no positions */}
           <p>You do not have any open positions.</p>
         </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th> {/* Last Traded Price */}
                <th>P&L</th>
              </tr>
            </thead>
            <tbody>
              {/* Map over the positions state */}
              {positions.map((position) => {
                // Calculate P&L for the individual position
                // Use correct field names: avgPrice, ltp
                const positionInvestment = (position.avgPrice || 0) * (position.qty || 0);
                const positionCurrentValue = (position.ltp || 0) * (position.qty || 0);
                const positionPnL = positionCurrentValue - positionInvestment;

                // Determine class based on calculated P&L
                const pnlClass = positionPnL >= 0 ? 'profit' : 'loss';

                return (
                  <tr key={position._id}> {/* Use MongoDB _id as key */}
                    <td>{position.product}</td>
                    <td>{position.name}</td>
                    <td>{position.qty}</td>
                    <td>{position.avgPrice?.toFixed(2)}</td>
                    <td>{position.ltp?.toFixed(2)}</td> {/* Display LTP */}
                    <td className={pnlClass}>
                      {positionPnL.toFixed(2)} {/* Display calculated P&L */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary row for total P&L */}
      {positions.length > 0 && (
        <div className="row summary-row">
          <div className="col">
            Total P&L: <span className={totalPositionsPnL >= 0 ? 'profit' : 'loss'}>{totalPositionsPnL.toFixed(2)}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Positions;
