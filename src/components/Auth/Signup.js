import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Signup.css';


function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.confirmPassword) {
            console.log("Passwords do not match");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(credentials.password)) {
            console.log("Password does not meet complexity requirements");
            return;
        }

        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        const json = await response.json();

        if (response.ok) {
            localStorage.setItem("token", json.token);
            navigate("/login");
        } else {
            console.log("Signup failed");
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
