import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
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