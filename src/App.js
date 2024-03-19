import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          {/* Add a default route to handle unknown URLs */}
          <Route path="*" element={<div>hola test</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
