import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        const json = await response.json();

        if (response.ok) {
            localStorage.setItem("token", json.token);
            navigate("/");
        } else {
            console.log("Invalid credentials");
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

export default Login;
