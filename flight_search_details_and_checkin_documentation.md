Overview
The Flight Tracker Web Application provides a comprehensive solution for users to search for flights, view detailed flight information, and check in online. This documentation covers three key components: Flight Search, Flight Details, and Check-in, detailing their functionalities, endpoints, and interactions with the backend services.

Base URL
All the components interact with the backend API hosted at: http://localhost:5000

Components
1. Flight Search Component
Endpoint: /api/flights/search
Method: GET
Description: Allows users to search for flights based on criteria such as departure and arrival locations, dates, and flight number.
Query Parameters:
departureLocation: The starting location of the flight.
arrivalLocation: The destination of the flight.
departureDate: The departure date for the flight.
returnDate: Optional. The return date for round-trip flights.
Response:
Success (200 OK): Returns a list of flights matching the search criteria.
Error (400 Bad Request): Invalid input or query parameters.

2. Flight Details Component
Endpoint: /api/flights/{flightId}
Method: GET
Description: Fetches detailed information about a specific flight, including times, status, and check-in details.
Path Parameters:
flightId: Unique identifier for the flight.
Response:
Success (200 OK): Returns detailed information about the flight.
Error (404 Not Found): Flight ID does not exist.

3. Check-in Component
Endpoint: /api/checkins
Method: POST for check-in initiation and PUT for updating check-in status.
Description: Enables users to check in for their flights using their booking reference and personal details.

Request Body (POST):
json
Copy code
{
  "flightNumber": "FT123",
  "passportNumber": "P12345678",
  "lastName": "Doe"
}

Response (POST):
Success (200 OK): Check-in initiated successfully.
Error (400 Bad Request): Invalid details or already checked in.
Endpoint for updating check-in status: /api/checkins/{checkinId}

Request Body (PUT):
json
Copy code
{
  "checkedIn": true
}

Response (PUT):
Success (200 OK): Check-in status updated successfully.
Error (404 Not Found): Check-in ID does not exist.

Notes
All endpoints require data to be sent as JSON.

Error Handling
Client-side errors (400 series) indicate issues such as invalid input, missing fields, or unauthorized actions.
Server-side errors (500 series) indicate issues with the backend service, such as database errors or unhandled exceptions.

Additional Information
This documentation provides a basic overview of the functionalities provided by the Flight Tracker Web Application's components. For extended functionality, customization, or integration with additional services (e.g., payment gateways for booking, real-time flight status updates), further development and configuration may be required.

