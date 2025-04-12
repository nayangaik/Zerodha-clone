// frontend/src/Landing_Page/login/Login.js (New File)
import React, { useState, useContext } from 'react'; // Added useContext
import { useNavigate } from 'react-router-dom'; // To redirect after login
// Assuming you have an AuthContext for managing auth state (See Step 3)
import { AuthContext } from '../../context/AuthContext'; // Adjust path as needed

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get login function from context

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Please enter both username and password.');
      setIsLoading(false);
      return;
    }

    try {
      // --- Backend API Call ---
      // Replace with your actual backend login endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      // --- Handle Success ---
      console.log('Login successful:', data);
      // Assuming the backend sends back a token and user info
      // Use the login function from AuthContext to store token/user state
      login(data.token, data.user); // Pass token and user data

      // Redirect to the dashboard
      navigate('/dashboard'); // Or the main entry point of your dashboard

    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Using Bootstrap classes similar to Signup
    <section className="container-fluid py-5 bg-light" style={{position:"relative" , right:"2em"}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h2 className="text-center mb-4">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="usernameInput" className="form-label">Username</label>
                    <input
                      type="text" // Changed from tel
                      className="form-control form-control-lg"
                      id="usernameInput"
                      placeholder="Enter your username"
                      aria-label="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input
                      type="password" // Added password field
                      className="form-control form-control-lg"
                      id="passwordInput"
                      placeholder="Enter your password"
                      aria-label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                  </div>
                </form>
                {/* Optional: Link to Signup or Forgot Password */}
                <p className="mt-3 text-center small">
                  Don't have an account? <a href="/signup">Sign up</a> {/* Link to your signup page */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
