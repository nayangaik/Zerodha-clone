// frontend/src/App.js (New or Modified File)
import React, { useContext } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'; // Import AuthContext

// --- Landing Page Components ---
import Navbar from './Landing_Page/Navbar';
import Footer from './Landing_Page/Footer';
import HomePage from './Landing_Page/home/HomePage';
import ProductPage from './Landing_Page/products/ProductPage';
import PricingPage from './Landing_Page/pricing/PricingPage';
import AboutPage from './Landing_Page/about/AboutPage'; // Keep signup if needed
import SupportPage from './Landing_Page/support/SupportPage';
import Notfound from './Landing_Page/Notfound';
import Login from './Landing_Page/signup/Login'; // Import the Login component

// --- Dashboard Component ---
// Assuming Home is the entry point for the authenticated dashboard
import Home from './dashboard/src/components/Home'; // Adjust path if needed

// --- Route Protection Components ---

// Component to protect routes that require authentication
const ProtectedRoute = () => {
  const { authToken, isLoading } = useContext(AuthContext);
  const location = useLocation(); // Get current location

  if (isLoading) {
    // Optional: Show a global loading spinner or skeleton screen
    return <div>Loading application state...</div>;
  }

  // If not loading and no token, redirect to login, saving the intended destination
  if (!authToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes (the dashboard)
  return <Outlet />; // Renders the nested dashboard routes/components
};

// Component for routes accessible only when logged out (like Login/Signup)
const PublicRoute = () => {
    const { authToken, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div>Loading application state...</div>;
    }

    // If logged in, redirect away from login/signup to the dashboard
    if (authToken) {
        return <Navigate to="/dashboard" replace />;
    }

    // If not logged in, render the child route (Login/Signup)
    return <Outlet />;
}

// --- Main App Component ---
function App() {
  const location = useLocation();

  // Determine if the current path is part of the dashboard
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      {/* Conditionally render Navbar and Footer only for non-dashboard routes */}
      {!isDashboardRoute && <Navbar />}

      <Routes>
        {/* --- Landing Page / Public Routes --- */}
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/pricing' element={<PricingPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/support' element={<SupportPage />} />
        {/* Add Signup if you still need a separate signup page */}
        

        {/* --- Authentication Routes (Public, but redirect if logged in) --- */}
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<Login />} />
          {/* You could add a signup route here too if it should only be for logged-out users */}
          {/* <Route path="/signup" element={<Signup />} /> */}
        </Route>

        {/* --- Protected Dashboard Routes --- */}
        <Route path="/dashboard/*" element={<ProtectedRoute />}>
          {/* The Home component likely contains its own nested Routes (like in Dash.js) */}
          {/* Using path="/*" delegates all sub-routing under /dashboard to the Home component */}
          <Route path="*" element={<Home />} />
        </Route>

        {/* --- Catch-all 404 Route --- */}
        <Route path='*' element={<Notfound />} />
      </Routes>

      {/* Conditionally render Navbar and Footer only for non-dashboard routes */}
      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default App;
