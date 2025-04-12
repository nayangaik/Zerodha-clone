// dashboard/src/components/Orders.js

import React, { useState, useEffect, useContext } from 'react'; // Import useContext
import { Link } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext'; // Import AuthContext
import './Orders.css';
import './Holding.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext); // Get the token from context

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);

      // Ensure token exists before fetching
      if (!authToken) {
        setError("Authentication token not found.");
        setIsLoading(false);
        return;
      }

      try {
        // Use relative path (relies on proxy) or full path
        // const apiUrl = '/api/orders'; // Relative path
        const apiUrl = 'http://localhost:3002/api/orders'; // Full path

        const response = await fetch(apiUrl, {
          method: 'GET', // Explicitly state method (optional for GET)
          headers: {
            // Add the Authorization header
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json' // Optional for GET, but good practice
          }
        });

        // --- Keep existing error handling ---
        if (!response.ok) {
          let errorMsg = `HTTP error! status: ${response.status}`;
          try {
            // Try to parse backend error message
            const errorData = await response.json();
            errorMsg = errorData.message || errorMsg;
          } catch (parseError) {
             // If response isn't JSON, use the status text
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
        console.log("Fetched orders from DB:", data);
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err.message || "Failed to load orders data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [authToken]); // Add authToken as a dependency

  // --- Keep existing render logic ---
  if (isLoading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="error">Error fetching orders: {error}</div>;
  }

  return (
    <div className="orders-container">
      <h3 className="title">Orders ({orders.length})</h3>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to={"/dashboard"} className="btn"> {/* Link to dashboard home */}
            Start Trading
          </Link>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
                <th>Timestamp</th> {/* Added Timestamp */}
                <th>Status</th> {/* Added Status */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price?.toFixed(2)}</td>
                  <td className={order.mode === 'BUY' ? 'profit' : 'loss'}>
                    {order.mode}
                  </td>
                   {/* Format timestamp */}
                  <td>{new Date(order.timestamp).toLocaleString()}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
