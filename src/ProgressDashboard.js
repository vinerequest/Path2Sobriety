import { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import { db, auth } from './firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

function ProgressDashboard() {
  const [sobrietyDays, setSobrietyDays] = useState(0);
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        // Example: Calculate sobriety days (simplified, assume user sets start date in profile)
        const startDate = new Date('2024-01-01'); // Replace with user’s actual start date
        const today = new Date();
        const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        setSobrietyDays(diffDays);

        // Fetch mood data from therapy chats (simplified, assume messages indicate mood)
        const q = query(collection(db, 'therapyChats'), where('userId', '==', user.uid), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const moods = querySnapshot.docs.map(doc => {
          const msg = doc.data().message.toLowerCase();
          let mood = 'Neutral';
          if (msg.includes('stressed') || msg.includes('sad')) mood = 'Negative';
          if (msg.includes('happy') || msg.includes('good')) mood = 'Positive';
          return { date: doc.data().timestamp.toDate(), mood };
        }).slice(0, 30); // Last 30 days
        setMoodData(moods);
      }
    };
    fetchData();
  }, []);

  const moodChartData = {
    labels: moodData.map(d => d.date.toLocaleDateString()),
    datasets: [{
      label: 'Mood Trend',
      data: moodData.map(d => d.mood === 'Positive' ? 2 : d.mood === 'Negative' ? 0 : 1),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      fill: true
    }]
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Progress Dashboard</h2>
      <p className="text-gray-700 mb-4">Sobriety Days: {sobrietyDays}</p>
      <div className="h-64">
        <Chart type="line" data={moodChartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}

export default ProgressDashboard;