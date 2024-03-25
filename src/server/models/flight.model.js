const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureDate: { type: Date, required: true },
  departureTime: { type: Date, required: true },
  newDepartureTime: { type: Date }, // Optional field. This is in case the flight is delayed or rescheduled
  arrivalDate: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  newArrivalTime: { type: Date },   // Optional field. This is in case the flight is delayed or rescheduled
  status: {
    type: String,
    required: true,
    enum: ['On time', 'Delayed', 'Cancelled', 'Pending', 'Rescheduled', 'Boarding', 'Gate Closed', 'In Flight', 'Diverted', 'Landed', 'Arrived'],
  },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
