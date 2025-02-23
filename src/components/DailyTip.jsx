import React, { useState, useEffect } from 'react';

function DailyTip() {
  const tips = [
    "Stay hydrated—drink plenty of water to support your recovery.",
    "Attend a recovery meeting today to connect with support.",
    "Practice gratitude by writing down three things you’re thankful for.",
    "Take a walk to clear your mind and boost your mood.",
    "Reach out to a sponsor or friend for encouragement."
  ];

  const [tip, setTip] = useState('');

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Daily Recovery Tip</h2>
      <p style={{ fontStyle: 'italic', color: '#666' }}>{tip}</p>
    </div>
  );
}

export default DailyTip;