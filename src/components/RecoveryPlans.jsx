import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation

function RecoveryPlans() {
  const plans = [
    { id: 1, title: 'Attend Weekly Support Meetings', description: 'Join local or online AA/NA meetings' },
    { id: 2, title: 'Daily Journaling', description: 'Write about progress and challenges each day' },
    { id: 3, title: 'Exercise Regularly', description: '30 minutes of exercise, 5 days a week' },
  ];
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Recovery Plans</h2>
      <nav className="mb-4 space-y-2">
        <button
          onClick={() => navigate('/login')}
          className="bg-gray-300 p-2 rounded hover:bg-gray-400"
        >
          Back to Login
        </button>
        <button
          onClick={() => navigate('/therapy-bot')}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Go to Therapy Bot
        </button>
        <button
          onClick={() => navigate('/progress')}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          View Progress
        </button>
      </nav>
      <ul className="space-y-4">
        {plans.map((plan) => (
          <li key={plan.id} className="border-b pb-2">
            <h3 className="text-lg font-semibold">{plan.title}</h3>
            <p className="text-gray-600">{plan.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecoveryPlans;