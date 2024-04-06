import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import './navigation.css';

const Navigation = () => {
    const isLoggedIn = localStorage.getItem('token');

    return (
        <nav className="custom-nav">
             <div className="logo-container">
                <Link to="/" className="logo">
                    <img src="/logo.png" alt="Logo" className="logo-image-main" /> {/* Update the image source */}
                </Link>
            </div>
            <ul className="nav-links">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>
                {/* Add your additional links here */}
                {/* ... */}

                {/* Conditional Rendering for Authentication Links */}
                {isLoggedIn ? (
                    <li className="nav-item">
                        <Link to="/logout" className="nav-link">
                            Logout
                        </Link>
                    </li>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
