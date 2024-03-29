import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Ensure this file exists in the same directory

const LandingPage = () => {
    return (
        <div className="landing-container">
            <div className="landing-header">
                <h1>Welcome to Flight Tracker</h1>
                <p>Your journey starts here. Explore the world with us.</p>
            </div>
            <div className="cta-container">
                <Link to="/login" className="cta-button">Get Started</Link>
            </div>
        </div>
    );
};

export default LandingPage;
