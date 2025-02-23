import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
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
      <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-md max-w-3xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Path2Sobriety</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Journey to Sobriety Starts Here</h2>
        <p className="text-gray-600 mb-4">
          Welcome to Path2Sobriety! Whether you’re just starting out or continuing your recovery, we’re here to support you every step of the way.
        </p>
        <p className="mt-2 text-gray-600 mb-6">
          Click below to log in and access personalized tools, resources, or track your progress.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;