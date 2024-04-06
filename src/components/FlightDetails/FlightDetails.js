  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useParams } from 'react-router-dom';
  import '../FlightSearch/FlightSearch.css'; // Same css file as flight search for now
  import './FlightDetails.css';
  import { useNavigate } from 'react-router-dom';
  import CheckinModal from '../Checkin/Checkin';

  const formatDate = (dateString) => {
      if (!dateString) return ''; // Return empty string if dateString is undefined or null
      return dateString.split('T')[0];
  };


  const FlightDetails = () => {
    const [flight, setFlight] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [showCheckinModal, setShowCheckinModal] = useState(false);

    const handleCheckinClick = () => {
      setShowCheckinModal(true);
    };
    
    const handleCheckin = async (passportNumber, lastName) => {
      try {
        if (!flight || !flight.flightNumber) {
          alert('Invalid flight details. Please try again.');
          return;
        }
    
        // Construct the query string using template literals and encodeURIComponent
        const queryString = `flight_number=${encodeURIComponent(flight.flightNumber)}` +
          `&user_passport=${encodeURIComponent(passportNumber)}` +
          `&user_last_name=${encodeURIComponent(lastName)}`;
    
        // Make the GET request to the backend with the encoded query string
        const searchResponse = await axios.get(`http://localhost:5000/api/checkins/findCheckin?${queryString}`);
    
        // If the search is successful and a check-in record is found
        if (searchResponse && searchResponse.data) {
          const updatePayload = { checked_in: true };
          // Make the PUT request to update the check-in status using the record's ID
          const updateResponse = await axios.put(`http://localhost:5000/api/checkins/${searchResponse.data._id}`, updatePayload);
    
          // Log the response to check the structure
          console.log('Update response:', updateResponse.data);

          // Handle the response from the server
          alert(updateResponse.data.message || "Check-in confirmed. Details sent to passenger's email");
          setShowCheckinModal(false); // Close the modal on successful check-in
        } else {
          alert('Check-in record not found.');
        }
      } catch (error) {
        // Handle the case where the passenger has already checked in
        if (error.response && error.response.status === 400) {
          alert(`Passenger already checked-in for flight ${flight.flightNumber}.`);
        } else {
          // If error.response is undefined, use a default error message
          const errorMessage = error.response ? error.response.data.message : 'An error occurred during check-in.';
          console.error('Error during check-in:', errorMessage);
          alert(errorMessage);
      }
    };  
  }
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
    <button className="check-in-button" onClick={handleCheckinClick}>Check-in</button>
    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
    {showCheckinModal && (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={() => setShowCheckinModal(false)}>&times;</span>
        <CheckinModal
          flightNumber={flight.flightNumber}
          origin={flight.origin}
          destination={flight.destination}    
          onClose={() => setShowCheckinModal(false)}
          onCheckin={handleCheckin}
        />
      </div>
    </div>
    )}
    </div>
      </div>
    );
    
  };
  
  export default FlightDetails;
