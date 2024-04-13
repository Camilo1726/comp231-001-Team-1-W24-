import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a href="https://www.twitter.com/example" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
            <p className="copyright">
                © {new Date().getFullYear()} FlightTracker, Inc. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
