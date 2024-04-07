import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Auth from "./components/Auth/Auth";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import LandingPage from "./components/LandingPage/LandingPage"; 
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Logout from "./components/Auth/Logout";
import FlightSearch from "./components/FlightSearch/FlightSearch";
import FlightDetails from './components/FlightDetails/FlightDetails';
import Footer from "./components/Footer/Footer"; 


function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />  {/* Set LandingPage as the default route */}
          <Route path="/login" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/flight-search" element={<FlightSearch />} />
          <Route path="/flight-details/:id" element={<FlightDetails />} />
          <Route path="/contact-us" element={<div>Contact Us Page</div>} />
          <Route path="*" element={<div>Page Not Found</div>} />       
        </Routes>
        <Footer /> {}
      </div>
    </Router>
  );
}

export default App;
