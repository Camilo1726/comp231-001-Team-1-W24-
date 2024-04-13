import React, { useState } from "react";
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login/register logic here
  };

  // Remove or use backgroundImageUrl variable as needed
  const backgroundImageUrl = "/background.png";

  return (
    <div
      className="auth-background"
      style={{ 
        backgroundImage: `url(${backgroundImageUrl})`, 
        backgroundSize: 'cover',
        opacity: 0.8, 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat' 
      }}
    >
      <div className="auth-container">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">{isLogin ? "Login" : "Register"}</button>
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Create account" : "Back to login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
