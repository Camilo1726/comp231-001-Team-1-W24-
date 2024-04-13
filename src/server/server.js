const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://cam1726:wFrvtH3YWexUuQJg@flighttrackerdb.wjjg1lp.mongodb.net/?retryWrites=true&w=majority&appName=FlightTrackerDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected successfully."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

// Define Flight Schema
const flightSchema = new mongoose.Schema({
  flightNumber: String,
  origin: String,
  destination: String,
  departureDate: Date,
  departureTime: String,
  arrivalDate: Date,
  arrivalTime: String,
  status: String,
});

// Create Flight Model
const Flight = mongoose.model("Flight", flightSchema);

// Define API Endpoint to Fetch Flights
app.get("/api/flights", async (req, res) => {
  try {
    const flights = await Flight.find();
    console.log("Fetched flights:", flights); // Add this line for logging
    res.json(flights);
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
