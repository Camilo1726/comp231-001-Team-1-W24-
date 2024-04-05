const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

const app = express();
const flightRoutes = require('./routes/flight.routes');
const checkinRoutes = require('./routes/checkin.routes');

app.use(cors());
app.use(express.json());
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully.'))
.catch((error) => console.error('MongoDB connection failed:', error.message));

app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/checkins', checkinRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
