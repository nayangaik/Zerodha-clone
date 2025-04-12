// Holdings.js (dashboard/src/components)

import React, { useState, useEffect, useContext , useMemo } from 'react'; // Import useContext
import { AuthContext } from '../../../context/AuthContext'; // Import AuthContext
import './Holding.css';
import VerticalGraph from './VerticalGraph';



const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext); // Get token

  useEffect(() => {
    const fetchHoldings = async () => {
      setIsLoading(true);
      setError(null);

      if (!authToken) {
        setError("Authentication token not found.");
        setIsLoading(false);
        return;
      }

      try {
        // Use relative path (relies on proxy) or full path
        // const apiUrl = '/api/holdings'; // Relative path
        const apiUrl = 'http://localhost:3002/api/holdings'; // Full path

        const response = await fetch(apiUrl, {
           headers: {
             // Add the Authorization header
             'Authorization': `Bearer ${authToken}`
           }
        });

        // --- Keep existing error handling ---
        if (!response.ok) {
          let errorMsg = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMsg = errorData.message || errorMsg;
          } catch (parseError) {
             errorMsg = response.statusText || errorMsg;
          }
          if (response.status === 401 || response.status === 403) {
             errorMsg = `Authorization failed: ${errorMsg}`;
             // logout(); // Consider logging out
          }
          throw new Error(errorMsg);
        }
        const data = await response.json();
        console.log("Fetched holdings from DB:", data);
        setHoldings(data);
      } catch (err) {
        console.error("Failed to fetch holdings:", err);
        setError(err.message || "Failed to load holdings data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHoldings();
  }, [authToken]);

  

  // --- Calculations ---
  // Use optional chaining and provide defaults for safety
  const totalInvestment = holdings.reduce((sum, holding) => sum + (holding.avgPrice || 0) * (holding.qty || 0), 0);
  const currentTotalValue = holdings.reduce((sum, holding) => sum + (holding.ltp || 0) * (holding.qty || 0), 0);
  const totalPnL = currentTotalValue - totalInvestment;
  const totalPnLPercentage = totalInvestment !== 0 ? (totalPnL / totalInvestment) * 100 : 0;

  // --- Prepare Data for the Chart ---
  // Use useMemo to avoid recalculating on every render unless holdings change
  const chartData = useMemo(() => {
    if (!holdings || holdings.length === 0) {
      // Return a default structure if no data, or null/undefined
      // depending on how VerticalGraph handles it.
      return {
        labels: [],
        datasets: [],
      };
    }

    const labels = holdings.map(holding => holding.name);
    const investmentValues = holdings.map(holding => (holding.avgPrice || 0) * (holding.qty || 0));
    const currentValues = holdings.map(holding => (holding.ltp || 0) * (holding.qty || 0));

    return {
      labels: labels,
      datasets: [
        {
          label: 'Investment Value',
          data: investmentValues,
          backgroundColor: 'rgba(255, 99, 132, 0.6)', // Reddish
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Current Value',
          data: currentValues,
          backgroundColor: 'rgba(53, 162, 235, 0.6)', // Blueish
          borderColor: 'rgba(53, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [holdings]);

  // --- Render Logic ---
  if (isLoading) {
    return <div className="loading">Loading holdings...</div>;
  }

  if (error) {
    return <div className="error">Error fetching holdings: {error}</div>;
  }

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>
      {holdings.length === 0 ? (
        <div className="no-holdings"> {/* Add a message for no holdings */}
           <p>You do not have any holdings.</p>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
                <th>Cur. val</th>
                <th>P&L</th>
                {/*<th>Net chg.</th>*/} {/* Removed as not in schema */}
                {/*<th>Day chg.</th>*/} {/* Removed as not in schema */}
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => {
                // Use fields from schema: avgPrice, ltp
                const investmentValue = (holding.avgPrice || 0) * (holding.qty || 0);
                const currentValue = (holding.ltp || 0) * (holding.qty || 0);
                const holdingPnL = currentValue - investmentValue;
                const pnlClass = holdingPnL >= 0 ? 'profit' : 'loss';

                return (
                  <tr key={holding._id}> {/* Use MongoDB _id */}
                    <td>{holding.name}</td>
                    <td>{holding.qty}</td>
                    <td>{holding.avgPrice?.toFixed(2)}</td>
                    <td>{holding.ltp?.toFixed(2)}</td>
                    <td>{currentValue.toFixed(2)}</td>
                    <td className={pnlClass}>
                      {holdingPnL.toFixed(2)}
                    </td>
                    {/*<td>{holding.net}</td>*/}
                    {/*<td>{holding.day}</td>*/}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

             {/* Totals section */}
          
      {holdings.length > 0 && ( // Keep the conditional rendering
        <div className="summary-container" style={{position:"relative" , top:"0.8em" , left:"8em"}}> {/* Optional: Add a container for easier styling */}
          <table className="summary-table">
            <tbody>
              {/* Row for the values */}
              <tr>
                <td>
                  <h5>{totalInvestment.toFixed(2)}</h5>
                </td>
                <td>
                  <h5>{currentTotalValue.toFixed(2)}</h5>
                </td>
                <td>
                  <h5 className={totalPnL < 0 ? 'loss' : 'profit'}>
                    {totalPnL.toFixed(2)} ({totalPnLPercentage.toFixed(2)}%)
                  </h5>
                </td>
              </tr>
              {/* Row for the labels */}
              <tr>
                <td>
                  <p>Total investment</p>
                </td>
                <td>
                  <p>Current value</p>
                </td>
                <td>
                  <p>P&L</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <VerticalGraph data={chartData}/>
    </>
  );
};

export default Holdings;
