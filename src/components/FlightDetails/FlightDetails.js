import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../FlightSearch/FlightSearch.css'; // Same css file as flight search for now
import './FlightDetails.css';
import { useNavigate } from 'react-router-dom';


const formatDate = (dateString) => {
    if (!dateString) return ''; // Return empty string if dateString is undefined or null
    return dateString.split('T')[0];
};

const FlightDetails = () => {
  const [flight, setFlight] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/flight-search'); // This should match the route path you've set for Flight Search
  };


  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/flights/${id}`);
        setFlight(response.data);
      } catch (error) {
        console.error('Error fetching flight details:', error);
      }
    };

    fetchFlightDetails();
  }, [id]);

  if (!flight) {
    // If flight details are not yet fetched, you can show a loader or a message
    return <div>Loading flight details...</div>;
    }  

  return (
    <div className="flight-details-container">
      <h2>Flight Details</h2>
      {/* Display flight details */}
      <div className="detail">
        <label>Flight Number:</label>
        <span>{flight.flightNumber}</span>
      </div>
      <div className="detail">
        <label>Origin:</label>
        <span>{flight.origin}</span>
      </div>
      <div className="detail">
        <label>Destination:</label>
        <span>{flight.destination}</span>
      </div>
      <div className="detail">
        <label>Departure Date:</label>
        <span>{formatDate(flight.departureDate)}</span>
      </div>
      <div className="detail">
        <label>Departure Time:</label>
        <span>{flight.departureTime}</span>
      </div>
      <div className="detail">
        <label>Arrival Date:</label>
        <span>{formatDate(flight.arrivalDate)}</span>
      </div>
      <div className="detail">
        <label>Arrival Time:</label>
        <span>{flight.arrivalTime}</span>
      </div>
      <div className="detail">
        <label>Status:</label>
        <span>{flight.status}</span>
      </div>
      <div className="button-group">
      <button className="check-in-button">Check-in</button>
      <button className="cancel-button" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default FlightDetails;
