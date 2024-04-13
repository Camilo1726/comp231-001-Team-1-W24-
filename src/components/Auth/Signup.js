import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import if jwt-decode is a default export
import axios from 'axios';
import './Signup.css';

function Signup() {
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        passport: '',
        isAdmin: false, // Initial state for admin toggle
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                const decodedToken = jwtDecode(response.data.token);
                navigate(decodedToken.isAdmin ? '/admin-dashboard' : '/user-dashboard');
            } else {
                setError('Signup failed: No token received');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Invalid signup data.');
            } else if (error.request) {
                setError('No response from the server.');
            } else {
                setError('Error: ' + error.message);
            }
            console.error('Signup error:', error);
        }
    };

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCredentials({
            ...credentials,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <div className='signup-container'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className='signup-form'>
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
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="isAdmin"
                        name="isAdmin"
                        checked={credentials.isAdmin}
                        onChange={onChange}
                    />
                    <label className="form-check-label" htmlFor="isAdmin">
                        Sign up as admin
                    </label>
                </div>
                {error && <div className='alert alert-danger'>{error}</div>}
                <button type='submit' className='signup-btn'>Sign Up</button>
            </form>
        </div>    
    );
}

export default Signup;
