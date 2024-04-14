import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode'; // make sure the import is correct
import './navigation.css';

const Navigation = () => {
    const navigate = useNavigate();

    const getUserInfo = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decoded = jwtDecode(token); // this is case-sensitive and should match the import statement
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
