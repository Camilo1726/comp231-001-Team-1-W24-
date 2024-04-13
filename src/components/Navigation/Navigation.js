import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import {jwtDecode} from 'jwt-decode';
import './navigation.css';

const Navigation = () => {
    const navigate = useNavigate();
    const myStyle = {
        width: 200,
        height: 160,
    };

    const getUserInfo = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            return {
                name: `${decoded.firstName} ${decoded.lastName}`,
                isAdmin: decoded.isAdmin
            };
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const user = getUserInfo();
    const isLoggedIn = !!user;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <Navbar bg="light" expand="lg" variant="light">
            <Navbar.Brand as={Link} to="/">
                <img src="logo_oasis_nav.png" style={myStyle} alt="Flight Tracker" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
                <Nav className="ml-auto">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/" className="nav-link">
                            Home
                        </Nav.Link>
                    </Nav.Item>
                    {isLoggedIn ? (
                        <>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/user-dashboard" className="nav-link">
                                    Welcome, {user.name}
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/" className="nav-link" onClick={handleLogout}>
                                    Logout
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
                            <Nav.Item>
                                <Nav.Link as={Link} to="/signup" className="nav-link">
                                    Sign Up
                                </Nav.Link>
                            </Nav.Item>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
