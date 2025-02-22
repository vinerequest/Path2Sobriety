import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TherapyBot from './components/TherapyBot';
import RecoveryPlans from './components/RecoveryPlans';
import ProgressDashboard from './components/ProgressDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mt-8">Welcome to Path2Sobriety</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/therapy-bot" element={<TherapyBot />} />
          <Route path="/recovery-plans" element={<RecoveryPlans />} />
          <Route path="/progress" element={<ProgressDashboard />} />
          <Route path="/" element={<Navigate to="/login" replace />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;