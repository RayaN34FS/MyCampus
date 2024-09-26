// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import ReportIncidentPage from './ReportIncidentPage';
import './styles/global.css'; // Import des styles globaux

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/report" element={<ReportIncidentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
