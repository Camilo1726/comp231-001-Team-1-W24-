const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const flightRoutes = require('./routes/flight.routes');
const checkinRoutes = require('./routes/checkin.routes');
const Flight = require('./models/flight.model'); // Import the Flight model to get status enum values

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully.'))
.catch((error) => console.error('MongoDB connection failed:', error.message));

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/checkins', checkinRoutes);

// Route to get flight statuses
app.get('/api/flight-statuses', (req, res) => {
    // Flight model is imported and has the 'status' field with enum
    res.json(Flight.schema.path('status').enumValues);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
