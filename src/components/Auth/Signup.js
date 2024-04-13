import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: "", 
        password: "", 
        confirmPassword: "",
        passport: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                // This is assuming your server responds with a JSON object that includes a message property
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Network response was not ok.');
            }

            const json = await response.json();

            localStorage.setItem("token", json.token);
            const decodedToken = jwtDecode(json.token);
            navigate(decodedToken.isAdmin ? '/admin-dashboard' : '/user-dashboard');
        } catch (error) {
            setError(error.message || "An error occurred. Please try again later.");
            console.error("Signup error:", error);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input 
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={credentials.firstName}
                    onChange={onChange}
                    required
                />
                <input 
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={credentials.lastName}
                    onChange={onChange}
                    required
                />
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={onChange}
                    required
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={onChange}
                    required
                />
                <input 
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={credentials.confirmPassword}
                    onChange={onChange}
                    required
                />
                <input 
                    type="text"
                    name="passport"
                    placeholder="Passport Number"
                    value={credentials.passport}
                    onChange={onChange}
                    required
                />
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="signup-btn">Sign Up</button>
            </form>
        </div>
    </div>
    
    );
}

export default Signup;
