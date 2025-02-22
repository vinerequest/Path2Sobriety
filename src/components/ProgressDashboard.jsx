import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ProgressDashboard() {
  const chartRef = useRef(null);
  const navigate = useNavigate(); // Hook for navigation

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Sobriety Progress',
        data: [0, 7, 14, 21], // Example data (days sober or therapy sessions)
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sobriety Progress Over Time',
      },
    },
    scales: {
      x: {
        type: 'category', // Explicitly set the scale type for the X-axis
        title: {
          display: true,
          text: 'Weeks',
        },
      },
      y: {
        type: 'linear', // Explicitly set the scale type for the Y-axis
        beginAtZero: true,
        title: {
          display: true,
          text: 'Days Sober',
        },
      },
    },
  };

  // Use useEffect to manage the chart and clean up properly
  useEffect(() => {
    let chartInstance = chartRef.current;

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Progress Dashboard</h2>
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
          onClick={() => navigate('/recovery-plans')}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          View Recovery Plans
        </button>
      </nav>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}

export default ProgressDashboard;