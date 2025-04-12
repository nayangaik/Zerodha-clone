// frontend/src/dashboard/src/components/Menu.js
import React, { useState, useContext } from "react"; // Added useContext
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { AuthContext } from "../../../context/AuthContext"; // Correct path to AuthContext
import "./Menu.css";
import logo from './logo.png';


const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0); // Consider using location pathname instead
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Get user and logout from context
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => { // Simplified toggle
    setIsProfileDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    // Optional: Redirect to login page after logout
    navigate('/login');
  };

  // TODO: Use useLocation hook to set active menu based on actual path
  // const location = useLocation();
  // useEffect(() => { ... set selectedMenu based on location.pathname ... }, [location]);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      {/* Consider making logo a link to dashboard home */}
      <Link to="/dashboard">
         <img src={logo} alt="logo" style={{ width: "50px", cursor: 'pointer' }} /> {/* Assuming logo.png is in public folder */}
      </Link>
      <div className="menus">
        <ul>
          <li>
            {/* Use full paths for links */}
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard" // Changed from "/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/orders" // Changed from "/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/holdings" // Changed from "/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/positions" // Changed from "/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/funds" // Changed from "funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/apps" // Changed from "/apps"
              onClick={() => handleMenuClick(6)} // Index seems off, maybe 5?
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          {/* Display initials or placeholder */}
          <div className="avatar">{user?.username ? user.username.substring(0, 2).toUpperCase() : 'ZU'}</div>
          {/* Display actual username */}
          <p className="username">{user?.username.toUpperCase() || 'USERID'}</p>
          {/* Basic Dropdown Example */}
          {isProfileDropdownOpen && (
            <div className="profile-dropdown" style={{"position":"relative" , bottom:"0.88em" , backgroundColor: "pink"}}>
              {/* Add other profile links if needed */}
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;


