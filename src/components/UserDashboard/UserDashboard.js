import "./UserDashboard.css";

// Import React, useState, useEffect
import React, { useState, useEffect } from "react";
import flightsData from "./flightsData"; // Import flightsData array

// Define UserDashboard component
const UserDashboard = () => {
  // Define state for flights data
  const [flights, setFlights] = useState([]);

  // Set flights state with sample flight data
  useEffect(() => {
    setFlights(flightsData);
  }, []);

  // JSX code for UserDashboard component
  return (
    <div>
      <h2>Flight Details</h2>
      <table className="flight-table">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Date</th>
            <th>Departure Time</th>
            <th>Arrival Date</th>
            <th>Arrival Time</th>
            <th>State</th> {/* New column for State */}
          </tr>
        </thead>
        <tbody>
          {/* Map over flights data and render rows */}
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.origin}</td>
              <td>{flight.destination}</td>
              <td>{flight.departureDate}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalDate}</td>
              <td>{flight.arrivalTime}</td>
              <td>{flight.state}</td> {/* Display the state of the flight */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export UserDashboard component
export default UserDashboard;
