import React, { useState, useEffect } from "react";
import "./UserDashboard.css";

import flightsData from "./flightsData";

const UserDashboard = () => {
  const [recentFlights, setRecentFlights] = useState([]);

  useEffect(() => {
    const currentDate = new Date(); // Get the current date and time

    // Filter out flights that have already departed
    const recentFlightsData = flightsData.filter((flight) => {
      const departureDateTime = new Date(
        `${flight.departureDate} ${flight.departureTime}`
      );
      return departureDateTime > currentDate;
    });

    // Set state with recent flights data
    setRecentFlights(recentFlightsData);
  }, []);

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
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {recentFlights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.origin}</td>
              <td>{flight.destination}</td>
              <td>{flight.departureDate}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalDate}</td>
              <td>{flight.arrivalTime}</td>
              <td>{flight.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
