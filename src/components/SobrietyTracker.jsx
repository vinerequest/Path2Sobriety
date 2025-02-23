import React, { useState, useEffect } from 'react';

function SobrietyTracker() {
  const [startDate, setStartDate] = useState(localStorage.getItem('sobrietyStart') || '');
  const [daysSober, setDaysSober] = useState(0);

  useEffect(() => {
    if (startDate) {
      const start = new Date(startDate);
      const today = new Date();
      const diffTime = Math.abs(today - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysSober(diffDays);
    }
  }, [startDate]);

  const handleStartDate = (e) => {
    const date = e.target.value;
    setStartDate(date);
    localStorage.setItem('sobrietyStart', date);
  };

  const getMilestoneMessage = () => {
    if (daysSober >= 365) return "One-Year Legend!";
    if (daysSober >= 90) return "90-Day Hero!";
    if (daysSober >= 30) return "30-Day Star!";
    if (daysSober >= 7) return "1-Week Warrior!";
    return "Keep Going!";
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Sobriety Tracker</h2>
      {!startDate ? (
        <div>
          <label style={{ marginRight: '10px' }}>Start of Sobriety: </label>
          <input type="date" onChange={handleStartDate} />
        </div>
      ) : (
        <div>
          <p style={{ fontSize: '1.5rem', color: '#28a745' }}>You’ve been sober for {daysSober} days!</p>
          <p style={{ fontWeight: 'bold', color: '#007bff' }}>{getMilestoneMessage()}</p>
          <div style={{ width: '100%', maxWidth: '300px', margin: '20px auto', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
            <div
              style={{
                width: `${Math.min(daysSober / 365 * 100, 100)}%`,
                backgroundColor: '#28a745',
                height: '20px',
                borderRadius: '5px',
                transition: 'width 0.3s ease',
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SobrietyTracker;