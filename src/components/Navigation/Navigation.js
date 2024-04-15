import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import './navigation.css';

// Navigation bar component
const Navigation = () => {
    const navigate = useNavigate();
    // Function to get user info from the token
    const getUserInfo = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decoded = jwtDecode(token); // Decode the token to get user info
            return {
                name: `${decoded.firstName} ${decoded.lastName}`,
                isAdmin: decoded.isAdmin
            };
        } catch (error) {
            console.error('Error decoding token:', error); // Log an error if decoding fails
            return null;
        }
    };
    // Check if the user is logged in
    const user = getUserInfo();
    const isLoggedIn = !!user;

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token from local storage
        navigate("/");
    };

    return (
        <Navbar bg="light" expand="lg" variant="light" className="custom-nav">
            <Navbar.Brand as={Link} to="/">
                <img src="/logo.png" alt="Logo" className="logo-image-main" />
            </Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Item>
                    <Nav.Link as={Link} to="/" className="nav-link">
                        Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/flight-search" className="nav-link">
                        Flight Search
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                            <Nav.Link as={Link} to="/signup" className="nav-link">
                                Sign Up
                            </Nav.Link>
                        </Nav.Item>

                {isLoggedIn ? (
                    <>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="nav-link" onClick={handleLogout}>
                                Logout
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/user-dashboard" className="nav-link">
                                Welcome, {user.name}
                            </Nav.Link>
                        </Nav.Item>
                    </>
                ) : (
                    <>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/login" className="nav-link">
                                Login
                            </Nav.Link>
                        </Nav.Item>
                    </>
                )}
            </Nav>
        </Navbar>
    );
};

export default Navigation;
