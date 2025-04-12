// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your global styles
import App from './App'; // Import the main App component
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

// Get the root DOM element
const rootElement = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(rootElement);

// Initial render: Render the App component wrapped with necessary providers.
root.render(
  <React.StrictMode>
    {/* BrowserRouter provides routing capabilities */}
    <BrowserRouter>
      {/* AuthProvider provides authentication context to the entire app */}
      <AuthProvider>
        {/* App component contains all the routes and main layout logic */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
