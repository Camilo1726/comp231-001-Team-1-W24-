import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import './Signup.css';

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
        <div class="container">
        <div class="signup-form">
            <h2>Sign Up</h2>
            <form>
                <div class="form-group">
                    <input type="text" name="name" placeholder="Name" class="form-control" />
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email" class="form-control" />
                </div>
                <div class="form-group">
                    <input type="password" name="password" placeholder="Password" class="form-control" />
                </div>
                <div class="form-group">
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary btn-block">Sign Up</button>
            </form>
        </div>
    </div>
    
    );
}

export default Signup;
