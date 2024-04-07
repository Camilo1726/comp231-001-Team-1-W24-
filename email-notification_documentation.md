Email Notification System Documentation

Overview

The Flight Tracker Email Notification System allows users to receive automated emails for flight check-ins and updates. This system is integral for keeping all users, including casual travelers, business travelers, family travel coordinators, teenagers, and airline check-in staff, informed about flight status changes.

Base URL: http://localhost:5000

Endpoints

1. Email Notification Preferences Update
Endpoint: /api/users/{userId}/email-preferences
Method: PUT

Description: Allows users to update their preferences for receiving email notifications.

Request Body:

json
Copy code
{
  "receiveCheckInNotifications": true
}
Response:

Success (200 OK):

json
Copy code
{
  "message": "Email preferences updated successfully."
}
Error (400 Bad Request): Invalid user ID or request format.

2. Send Check-In Email Notification
Endpoint: /api/notifications/send-check-in
Method: POST

Description: Sends a check-in notification email to users who have opted in for check-in notifications and have an upcoming flight.

Request Body:

json
Copy code
{
  "userId": "unique_user_id",
  "flightId": "unique_flight_id"
}
Response:

Success (200 OK):

json
Copy code
{
  "message": "Check-in email notification sent successfully."
}
Error (400 Bad Request): User has not opted for check-in notifications or the flight ID is invalid.

Templates

Email Notification Template
The system uses predefined email templates for notifications, ensuring a consistent and branded communication experience. The templates are customizable and can include dynamic content such as user name, flight details, and personalized links for check-in procedures.

Service Integration

Backend Service for Email Delivery
The system integrates with third-party email delivery services like SendGrid or Amazon SES to manage the sending of email notifications. The service is configured to handle various types of notifications and ensures reliable delivery.

Database Schema Updates
The user model in the database includes an emailPreferences field that stores the user's notification preferences. A separate collection/table for tracking notifications sent to users is also maintained to prevent duplicate emails and allow for auditing.

Frontend for Managing Preferences
The frontend provides interfaces where users can set and update their email notification preferences. This includes toggles for different types of notifications and a confirmation process to verify the user's email address.

Documentation and Usage

User Documentation
The application provides a user guide explaining how to set up and manage email preferences. This documentation is accessible within the user's profile settings and includes FAQs on email notification topics.

Developer Documentation
Developer documentation includes details on how to extend the email notification system for additional types of notifications, how to update templates, and how to monitor the email delivery service.
