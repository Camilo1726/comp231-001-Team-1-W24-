import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import './Signup.css';

// Signup component
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

    // Handle form submission
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

    // Handle input changes
    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCredentials({
            ...credentials,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <div className='signup-container'>
            <form onSubmit={handleSubmit} className='signup-form'>
                <div className='mb-3'>
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={credentials.firstName}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={credentials.lastName}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email" className="form-label">Email</label>
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
                <div className='mb-3'>
                    <label htmlFor="password" className="form-label">Password</label>
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
                <div className='mb-3'>
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={credentials.confirmPassword}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="passport" className="form-label">Passport Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="passport"
                        name="passport"
                        value={credentials.passport}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-check mb-3">
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
                <button type='submit' className='btn btn-primary'>Sign Up</button>
            </form>
        </div>
    );
    
}

export default Signup;
