const mongoose = require('mongoose');

const checkinSchema = new mongoose.Schema({
  flight_number: {
    type: String,
    required: true,
  },
  user_passport: {
    type: String,
    required: true,
  },
  user_last_name: {
    type: String,
    required: true,
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
