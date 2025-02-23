import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import TherapyBot from './components/TherapyBot';
import Resources from './components/Resources';
import ProgressDashboard from './components/ProgressDashboard';
import LandingPage from './components/LandingPage';
import DiscussionBoard from './components/DiscussionBoard';
import HomelessResources from './components/HomelessResources';
import SobrietyTracker from './components/SobrietyTracker';
import Profile from './components/Profile';
import Register from './components/Register'; // Import the new Register component

function App() {
  return (
    <Router>
      <div
        className="min-h-screen flex flex-col items-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          overflowX: 'hidden',
        }}
      >
        <h1 className="text-3xl font-bold text-white mt-8">Welcome to Path2Sobriety</h1>
        <nav className="mt-4 flex flex-wrap justify-center gap-6">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/therapy-bot"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Therapy Bot
          </Link>
          <Link
            to="/resources"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            View Recovery Resources
          </Link>
          <Link
            to="/progress"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Progress
          </Link>
          <Link
            to="/discussion"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Discussion Board
          </Link>
          <Link
            to="/homeless-resources"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Homeless Resources
          </Link>
          <Link
            to="/tracker"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sobriety Tracker
          </Link>
          <Link
            to="/profile"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Profile
          </Link>
          <Link
            to="/register"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/therapy-bot" element={<TherapyBot />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/progress" element={<ProgressDashboard />} />
          <Route path="/discussion" element={<DiscussionBoard />} />
          <Route path="/homeless-resources" element={<HomelessResources />} />
          <Route path="/tracker" element={<SobrietyTracker />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;