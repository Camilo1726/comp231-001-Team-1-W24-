const mongoose = require('mongoose');

const checkinSchema = new mongoose.Schema({
  flight_number: {
    type: String,
    required: true,
    ref: 'Flight'
  },
  user_passport: {
    type: String,
    required: true,
    ref: 'User'
  },
  user_last_name: {
    type: String,
    required: true,
    ref: 'User'
  },
  checked_in: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // adds createdAt and updatedAt timestamps
});

const Checkin = mongoose.model('Checkin', checkinSchema);

module.exports = Checkin;
