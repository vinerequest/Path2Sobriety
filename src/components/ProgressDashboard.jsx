import { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import { db, auth } from '../firebase'; // Correct for src/components/
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

function ProgressDashboard() {
  const [sobrietyDays, setSobrietyDays] = useState(0);
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up Firebase auth listener
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          // Calculate sobriety days (simplified, use actual user start date if stored in Firestore)
          const startDate = new Date('2024-01-01'); // Replace with user's actual start date from Firestore or Profile
          const today = new Date();
          const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
          setSobrietyDays(diffDays);

          // Fetch mood data from therapy chats
          const q = query(collection(db, 'therapyChats'), where('userId', '==', currentUser.uid), orderBy('timestamp', 'desc'));
          const querySnapshot = await getDocs(q);
          const moods = querySnapshot.docs.map(doc => {
            const msg = doc.data().message.toLowerCase();
            let mood = 'Neutral';
            if (msg.includes('stressed') || msg.includes('sad')) mood = 'Negative';
            if (msg.includes('happy') || msg.includes('good')) mood = 'Positive';
            return { date: doc.data().timestamp.toDate(), mood };
          }).slice(0, 30); // Last 30 days
          setMoodData(moods);
        } catch (error) {
          console.error('Error fetching progress data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSobrietyDays(0);
        setMoodData([]);
        setLoading(false);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []); // Empty dependency array—effect runs once on mount/unmount

  const moodChartData = {
    labels: moodData.map(d => d.date.toLocaleDateString()),
    datasets: [{
      label: 'Mood Trend',
      data: moodData.map(d => d.mood === 'Positive' ? 2 : d.mood === 'Negative' ? 0 : 1),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      fill: true,
    }],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Mood Level' },
        ticks: { callback: value => ['Negative', 'Neutral', 'Positive'][value] },
      },
      x: { title: { display: true, text: 'Date' } },
    },
    plugins: { legend: { position: 'top' } },
  };

  if (loading) {
    return <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Progress Dashboard</h2>
      {sobrietyDays > 0 ? (
        <>
          <p className="text-gray-700 mb-4">Sobriety Days: {sobrietyDays}</p>
          <div className="h-64">
            {moodData.length > 0 ? (
              <Chart type="line" data={moodChartData} options={chartOptions} />
            ) : (
              <p className="text-gray-500">No mood data available yet. Use the Therapy Bot to log your feelings!</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-500">Set your sobriety start date in the Sobriety Tracker to see your progress!</p>
      )}
    </div>
  );
}

export default ProgressDashboard;