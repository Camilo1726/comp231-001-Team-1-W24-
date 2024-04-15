import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import "./UserDashboard.css";

// User dashboard component
const UserDashboard = () => {
  const [recentFlights, setRecentFlights] = useState([]);
  const [user, setUser] = useState({ firstName: '', lastName: '', passport: '' });
  const navigate = useNavigate();

  // This effect runs when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          passport: decoded.passport, // Set the passport number from the token
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  // This effect fetches the user's recent flights when the passport number is set
  useEffect(() => {
    if (user.passport) {
      axios.get(`http://localhost:5000/api/flights-by-passport?passportNumber=${user.passport}`)
        .then((response) => {
          setRecentFlights(response.data);
        })
        .catch((error) => {
          console.error("Error fetching flights:", error);
        });
    }
}, [user.passport]); // This effect runs when the passport number is set

  // Function to handle the click event on a flight row
  const handleFlightClick = (flightId) => {
    navigate(`/flight-details/${flightId}`);
  };
  

  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h2>Welcome {user.firstName} {user.lastName}!</h2>
        <p>{user.passport ? `Passport Number: ${user.passport}` : "Passport number not available"}</p>
        <p>Please see your next scheduled flights with Flight Tracker Airlines</p>
        <p className="search-link">
          Can't find your flight? <span onClick={() => navigate('/flight-search')}>Click here</span> to search for it.
        </p>
      </div>
      <div>
        <h2>Your Next Flights</h2>
        <table className="flight-table">
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Destination</th>
              <th>Departure Date</th>
              <th>Departure Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentFlights.map((flight) => (
              <tr 
              key={flight._id}
              onClick={() => handleFlightClick(flight._id)}
              className="clickable-row"
              >
                <td>{flight.flightNumber}</td>
                <td>{flight.destination}</td>
                <td>{new Date(flight.departureDate).toLocaleDateString()}</td>
                <td>{flight.departureTime}</td>
                <td>{flight.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
