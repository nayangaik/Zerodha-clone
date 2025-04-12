// frontend/src/context/AuthContext.js (New File)
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken')); // Persist token
  const [user, setUser] = useState(null); // Optional: store user info
  const [isLoading, setIsLoading] = useState(true); // To handle initial check

  // Function to handle login
  const login = (token, userData) => {
    localStorage.setItem('authToken', token); // Store token
    setAuthToken(token);
    setUser(userData); // Store user info if needed
    // You might want to set Axios/fetch default headers here
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('authToken'); // Remove token
    setAuthToken(null);
    setUser(null);
    // Remove default headers
    // delete axios.defaults.headers.common['Authorization'];
    // Redirect to login or home page might happen here or in component
  };

  // Optional: Verify token on initial load (e.g., call a /api/auth/me endpoint)
  useEffect(() => {
    const verifyToken = async () => {
       if (authToken) {
         try {
           // Example: Call backend to verify token and get user data
           // const response = await fetch('/api/auth/verify', {
           //   headers: { 'Authorization': `Bearer ${authToken}` }
           // });
           // if (response.ok) {
           //   const userData = await response.json();
           //   setUser(userData);
           // } else {
           //   logout(); // Token invalid or expired
           // }
           console.log("Token found, assuming valid for now. Implement verification.");
           // For now, just stop loading if token exists
         } catch (error) {
           console.error("Token verification failed:", error);
           logout();
         }
       }
       setIsLoading(false);
    };
    verifyToken();
  }, [authToken]); // Re-run if authToken changes (though unlikely needed here)


  const value = {
    authToken,
    user,
    isLoading, // Provide loading state for initial check
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
