import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import './navigation.css';

const Navigation = () => {
    const myStyle = {
        width: 200,
        height: 160,
    };

    const isLoggedIn = localStorage.getItem('token');

    return (
        <Navbar bg="light" expand="lg" variant="light">
            <Navbar.Brand as={Link} to="/">
                <img src="logo_oasis_nav.png" style={myStyle} alt="Flight Tracker" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
                <Nav className="ml-auto">
                    {/* Link to Home */}
                    <Nav.Item>
                        <Nav.Link as={Link} to="/" className="nav-link">
                            Home
                        </Nav.Link>
                    </Nav.Item>

                    {/* Add your additional links here */}
                    {/* ... */}

                    {/* Conditional Rendering for Authentication Links */}
                    {isLoggedIn ? (
                        <Nav.Item>
                            <Nav.Link as={Link} to="/logout" className="nav-link">
                                Logout
                            </Nav.Link>
                        </Nav.Item>
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
