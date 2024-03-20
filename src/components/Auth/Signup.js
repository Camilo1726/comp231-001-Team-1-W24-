import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

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
        <div className="container-fluid vh-100" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/beach.gif)`, backgroundSize: 'cover' }}>
            {/* ... rest of your JSX code */}
        </div>
    );
}

export default Signup;
