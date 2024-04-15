import React from 'react';
import { useNavigate } from 'react-router-dom';

// Logout component
function Logout() {
    // Use the navigate hook to redirect the user to the login page
    let history = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        history("/login");
    }
  return (
    <>
        <button className="btn btn-primary btn-sm" onClick={logout}>Logout</button>
    </>
  )
}

export default Logout