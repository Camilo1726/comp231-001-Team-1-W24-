// flightsData.js

//this is the provisional schema for the flights data
//this data will be used to populate the flights table in the user dashboard and flight search components
//this data will be replaced with the actual data from the backend API - MongoDB

const flightsData = [
  {
    id: 1,
    flightNumber: "DL123",
    origin: "New York",
    destination: "Los Angeles",
    departureDate: "2024-03-22",
    departureTime: "10:00 AM",
    arrivalDate: "2024-03-22",
    arrivalTime: "01:00 PM",
    state: "On Time",
  },
  {
    id: 2,
    flightNumber: "UA456",
    origin: "Chicago",
    destination: "Miami",
    departureDate: "2024-03-22",
    departureTime: "11:30 AM",
    arrivalDate: "2024-03-22",
    arrivalTime: "03:00 PM",
    state: "Delayed",
  },
  {
    id: 3,
    flightNumber: "AA789",
    origin: "Dallas",
    destination: "Denver",
    departureDate: "2024-03-22",
    departureTime: "09:45 AM",
    arrivalDate: "2024-03-22",
    arrivalTime: "11:30 AM",
    state: "On Time",
  },
  {
    id: 4,
    flightNumber: "UA789",
    origin: "Los Angeles",
    destination: "New York",
    departureDate: "2024-03-22",
    departureTime: "02:00 PM",
    arrivalDate: "2024-03-22",
    arrivalTime: "05:00 PM",
    state: "On Time",
  },
  {
    id: 5,
    flightNumber: "AA123",
    origin: "Miami",
    destination: "Chicago",
    departureDate: "2024-03-22",
    departureTime: "01:30 PM",
    arrivalDate: "2024-03-22",
    arrivalTime: "04:00 PM",
    state: "Delayed",
  },
  {
    id: 6,
    flightNumber: "DL456",
    origin: "Denver",
    destination: "Dallas",
    departureDate: "2024-03-22",
    departureTime: "12:00 PM",
    arrivalDate: "2024-03-22",
    arrivalTime: "02:00 PM",
    state: "On Time",
  },
  {
    id: 7,
    flightNumber: "DL789",
    origin: "Los Angeles",
    destination: "Miami",
    departureDate: "2024-03-22",
    departureTime: "10:30 AM",
    arrivalDate: "2024-03-22",
    arrivalTime: "02:00 PM",
    state: "Delayed",
  },
  {
    id: 8,
    flightNumber: "UA123",
    origin: "New York",
    destination: "Dallas",
    departureDate: "2024-03-22",
    departureTime: "11:00 AM",
    arrivalDate: "2024-03-22",
    arrivalTime: "02:00 PM",
    state: "On Time",
  },
  {
    id: 9,
    flightNumber: "AA456",
    origin: "Chicago",
    destination: "Denver",
    departureDate: "2024-03-22",
    departureTime: "09:00 AM",
    arrivalDate: "2024-03-22",
    arrivalTime: "11:30 AM",
    state: "Delayed",
  },
  {
    id: 10,
    flightNumber: "DL789",
    origin: "Miami",
    destination: "Los Angeles",
    departureDate: "2024-03-22",
    departureTime: "08:00 AM",
    arrivalDate: "2024-03-22",
    arrivalTime: "11:00 AM",
    state: "On Time",
  },
];

export default flightsData;