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

// PUT request to update check-in status when user checks in
router.put('/checkin', async (req, res) => {
    try {
      const { flight_number, user_passport, user_last_name } = req.body;
      let updateCriteria = { flight_number, checked_in: false };  // Default criteria include not already checked in
  
      // Extend criteria based on provided data
      if (user_passport) {
        updateCriteria.user_passport = user_passport;
      } else if (user_last_name) {
        updateCriteria.user_last_name = user_last_name;
      } else {
        return res.status(400).json({ message: "Please provide either a passport number or a last name for check-in." });
      }
  
      // Attempt to find and update the check-in status
      const updatedCheckin = await Checkin.findOneAndUpdate(updateCriteria, { $set: { checked_in: true } }, { new: true });
  
      if (updatedCheckin) {
        // Successfully found and updated the check-in status
        res.status(200).json({ message: "Check-in successful", checkin: updatedCheckin });
      } else {
        // No matching document found, could be due to various reasons
        const existingRecord = await Checkin.findOne({
          flight_number,
          $or: [{ user_passport }, { user_last_name }]
        });
  
        if (existingRecord) {
          if (existingRecord.checked_in) {
            res.status(400).json({ message: "Already checked in." });
          } else {
            res.status(404).json({ message: "Check-in record found, but criteria do not match exactly." });
          }
        } else {
          res.status(404).json({ message: "Ticket not found. Please verify your information." });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
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
  