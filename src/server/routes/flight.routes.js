const express = require('express');
const Flight = require('../models/flight.model');

const router = express.Router();

// Endpoint to add a new flight
router.post('/flights', async (req, res) => {
    try {
        const flight = new Flight(req.body);
        await flight.save();
        res.status(201).send(flight);
    } catch (err) {
        res.status(500).send('Error creating flight: ' + err.message);
    }
});

// Endpoint to retrieve all flights
router.get('/flights', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.send(flights);
    } catch (err) {
        res.status(500).send('Error retrieving flights: ' + err.message);
    }
});


module.exports = router;
