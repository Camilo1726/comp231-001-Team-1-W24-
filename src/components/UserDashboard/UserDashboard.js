import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [recentFlights, setRecentFlights] = useState([]);

  useEffect(() => {
    // Fetch recent flights data from the backend
    axios
      .get("http://localhost:5000/api/flights")
      .then((response) => {
        console.log("Fetched flights data:", response.data);
        setRecentFlights(response.data);
        console.log("Recent flights:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
      });
  }, []); // This effect runs only once after the component mounts

  return (
    <div>
      <h2>Recent Flights</h2>
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentFlights.map((flight) => (
            <tr key={flight._id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.origin}</td>
              <td>{flight.destination}</td>
              <td>{new Date(flight.departureDate).toLocaleDateString()}</td>
              <td>{flight.departureTime}</td>
              <td>{new Date(flight.arrivalDate).toLocaleDateString()}</td>
              <td>{flight.arrivalTime}</td>
              <td>{flight.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
