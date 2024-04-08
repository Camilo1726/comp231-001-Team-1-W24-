import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // The correct import statement, no brackets needed
import axios from 'axios'; // Import axios to make the API call

import './Login.css';

function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 > Date.now()) {
                    navigate(decodedToken.isAdmin ? '/admin-dashboard' : '/user-dashboard');
                } else {
                    localStorage.removeItem('token'); // Token expired
                }
            } catch (error) {
                console.error('Error decoding token', error);
                localStorage.removeItem('token'); // Invalid token
            }
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", credentials);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                const decodedToken = jwtDecode(response.data.token);
                navigate(decodedToken.isAdmin ? '/admin-dashboard' : '/user-dashboard');
            } else {
                // No token in response, set an error message
                setError("Login failed: No token received");
            }
        } catch (error) {
            if (error.response) {
                // Request made and server responded
                setError(error.response.data.message || "Invalid credentials");
            } else if (error.request) {
                // The request was made but no response was received
                setError("No response from server");
            } else {
                // Something happened in setting up the request that triggered an Error
                setError("Error: " + error.message);
            }
            console.error('Login error:', error);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container-fluid">
            <div className="form-container">
                <form onSubmit={handleSubmit} className="mt-5">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
