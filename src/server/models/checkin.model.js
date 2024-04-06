const mongoose = require('mongoose');

const checkinSchema = new mongoose.Schema({
  flight_number: {
    type: String,
    required: true,
    //ref: 'flights' > This is commented out because we will wait until USERS are created to iplement this
  },
  user_passport: {
    type: String,
    required: true,
    //ref: 'users' > This is commented out because we don't have a User model yet
  },
  user_last_name: {
    type: String,
    required: true,
    // ref: 'users' > This is commented out because we don't have a User model yet
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
