const express = require('express');
const Checkin = require('../models/checkin.model');

const router = express.Router();

// GET request to retrieve all check-ins
router.get('/', async (req, res) => {
    try {
      const checkins = await Checkin.find();
      res.json(checkins);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// POST request to create a check-in
router.post('/', async (req, res) => {
  try {
    const { flight_number, user_passport, user_last_name } = req.body;
    
    const checkin = new Checkin({
      flight_number,
      user_passport,
      user_last_name
    });
    
    await checkin.save();
    res.status(201).json(checkin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT request to update check-in status by ID
router.put('/:id', async (req, res) => {
  try {
    const checkin = await Checkin.findByIdAndUpdate(req.params.id, {
      checked_in: true
    }, { new: true }); // return the updated document

    if (!checkin) {
      return res.status(404).json({ message: 'Check-in not found' });
    }

    res.json(checkin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET request to find a check-in based on criteria (BOTH passport and last name must match to avoid false positives)
router.get('/findCheckin', async (req, res) => {
  const { flight_number, user_passport, user_last_name } = req.query;

  try {
      // Updated query to require both user_passport and user_last_name for a match
      let query = { 
        flight_number,
        user_passport, // Match both passport number
        user_last_name // and last name
      };

      const checkin = await Checkin.findOne(query);

      if (!checkin) {
          return res.status(404).json({ message: "Check-in record not found." });
      }

      res.json(checkin); // Send back the found check-in record
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



// PUT endpoint to handle the check-in process.
router.put('/checkin:id', async (req, res) => {
    const { flight_number, user_passport, user_last_name } = req.body;
  
    try {
      // Attempt to find a matching check-in document.
      let match = await Checkin.findOne({
        flight_number,
        $or: [
          { user_passport: user_passport },
          { user_last_name: user_last_name }
        ],
      });
  
      // If no match is found
      if (!match) {
        return res.status(404).json({ message: "Passenger not included in the passenger list for flight " + flight_number });
      }
  
      // If a match is found but already checked in
      if (match.checked_in) {
        return res.status(400).json({ message: "Passenger already checked-in." });
      }
  
      // If a match is found and not yet checked in, update the document
      match.checked_in = true;
      await match.save();
  
      // Return a success response
    } catch (error) {
      // Handle errors
      if (error.code === 'SomeErrorCodeForAlreadyCheckedIn') {
        res.status(400).json({ message: `Passenger already checked-in for flight ${req.body.flight_number}.` });
      } else {
        res.status(500).json({ message: "An error occurred during the check-in process.", error: error.message });
      }
    }
  });
  
  

// DELETE request to remove a check-in by ID
router.delete('/:id', async (req, res) => {
    try {
      const checkin = await Checkin.findByIdAndDelete(req.params.id);
  
      if (!checkin) {
        return res.status(404).json({ message: 'Check-in not found' });
      }
  
      res.status(200).json({ message: 'Check-in deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


// POST request to create multiple check-ins
router.post('/bulk', async (req, res) => {
    try {
      const checkins = await Checkin.insertMany(req.body);
      res.status(201).json(checkins);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;
  