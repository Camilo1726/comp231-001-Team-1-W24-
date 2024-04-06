import React, { useState } from 'react';
import './Checkin.css'; //  CSS file for Checkin component

const CheckinModal = ({ flightNumber, origin, destination, onClose, onCheckin }) => {
    const [passportNumber, setPassportNumber] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checkin Attempt:", { flightNumber, passportNumber, lastName }); // line for debugging
    onCheckin(passportNumber, lastName);
  };

  return (
    <div className="checkin-modal-backdrop">
      <div className="checkin-modal-content">
        <h3>
            Check-in for:<br />
            Flight {flightNumber}<br />
            {origin} - {destination}
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={passportNumber}
            onChange={e => setPassportNumber(e.target.value)}
            placeholder="Passport Number"
          />
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <div className="button-wrapper">
          <button type="submit" className="modal-button check-in">Check-in</button>
          <button className="modal-button cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckinModal;
