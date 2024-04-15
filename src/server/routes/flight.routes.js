const express = require('express');
const Flight = require('../models/flight.model');
const Checkin = require('../models/checkin.model'); // Import the Checkin model to get user passport number

const router = express.Router();

// Endpoint to get flights by passport number
router.get('/flights-by-passport', async (req, res) => {
    const { passportNumber } = req.query;
    try {
        console.log('Passport Number:', passportNumber); // Log the passport number being searched
        const checkIns = await Checkin.find({ user_passport: passportNumber }).select('flight_number');
        console.log('CheckIns:', checkIns); // Log the check-ins found
        const flightNumbers = checkIns.map(checkin => checkin.flight_number);
        console.log('Flight Numbers:', flightNumbers); // Log the flight numbers extracted
        const flights = await Flight.find({ flightNumber: { $in: flightNumbers } });
        console.log('Flights:', flights); // Log the flights found
        res.json(flights);
    } catch (error) {
        console.error('Error fetching flights by passport:', error);
        res.status(500).send('Server error');
    }
});

// Endpoint to add a new flight
router.post('/', async (req, res) => {
    try {
        const flight = new Flight(req.body);
        await flight.save();
        res.status(201).send(flight);
    } catch (err) {
        res.status(500).send('Error creating flight: ' + err.message);
    }
});

// Endpoint to retrieve all flights
router.get('/', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.send(flights);
    } catch (err) {
        res.status(500).send('Error retrieving flights: ' + err.message);
    }
});

// Endpoint to retrieve flight by ID
router.get('/:id', async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
      if (!flight) {
        return res.status(404).send('Flight not found');
      }
      res.send(flight);
    } catch (err) {
      res.status(500).send('Error retrieving flight: ' + err.message);
    }
  });
  


//Endpoint to update a flight
router.put('/:id', async (req, res) => {
    try {
        const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFlight) {
            return res.status(404).send('Flight not found');
        }
        res.send(updatedFlight);
    } catch (err) {
        res.status(400).send('Error updating flight: ' + err.message);
    }
});


// Endpoint to delete a flight
router.delete('/:id', async (req, res) => {
    try {
        const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
        if (!deletedFlight) {
            return res.status(404).send('Flight not found');
        }
        res.send(deletedFlight);
    } catch (err) {
        res.status(500).send('Error deleting flight: ' + err.message);
    }
});









module.exports = router;
