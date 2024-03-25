Flight Tracker API Documentation
Overview
The Flight Tracker API provides endpoints for user authentication, including signing up new users and logging in existing users.

Base URL: http://localhost:5000

Endpoints
1. User Signup
Endpoint: /api/auth/signup

Method: POST

Description: Registers a new user in the system.

Request Body:

json
Copy code
{
  "email": "user@example.com",
  "password": "YourSecurePassword123!"
}
Response:

Success (201 Created):
json
Copy code
{
  "token": "jwt.token.here"
}
Error (400 Bad Request): User already exists or input validation failed.
2. User Login
Endpoint: /api/auth/login

Method: POST

Description: Authenticates an existing user.

Request Body:

json
Copy code
{
  "email": "user@example.com",
  "password": "YourPassword"
}
Response:

Success (200 OK):
json
Copy code
{
  "token": "jwt.token.here",
  "isAdmin": false
}
Error (400 Bad Request): Invalid email or password.
Notes
All endpoints require data to be sent as JSON.
Successful user registration or login will return a JSON Web Token (JWT) that should be used for authenticating subsequent requests.
The isAdmin field in the login response indicates whether the user has administrative privileges.
Error Handling
Responses with status codes in the range of 400 (e.g., 400, 401, 403) indicate client-side errors, such as invalid input or unauthorized access.
Responses with status codes in the range of 500 (e.g., 500, 501) indicate server-side errors.
