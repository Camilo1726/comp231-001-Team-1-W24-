import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 

const LandingPage = () => {
    return (
        <div className="landing-container">
            <div className="box-container">
                <div className="horizontal-container">
                    <div className="box">
                        <div className="landing-header">
                            <h1>Welcome to Flight Tracker</h1>
                            <p>Your journey starts here. Explore the world with us.</p>
                        </div>
                        <div className="cta-container">
                            <Link to="/login" className="cta-button">Get Started</Link>
                        </div>
                    </div>
                    <div className="box">
                        <img src="/globe.png" alt="Plane" className="plane-image" />
                    </div>
                </div>
                <div className="horizontal-container">
                    <div className="box"></div>
                    <div className="box"></div>
                </div>
                <div className="horizontal-container">
                    <div className="box"></div>
                    <div className="box"></div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
