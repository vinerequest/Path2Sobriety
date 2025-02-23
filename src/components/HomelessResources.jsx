import React from 'react';

function HomelessResources() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Homelessness Resources</h2>
      <p>Find support for housing, jobs, and recovery in the U.S.:</p>
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
        <li><a href="https://www.hud.gov/homeless" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>HUD Homeless Assistance</a></li>
        <li><a href="https://www.samhsa.gov/homelessness-programs-resources" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>SAMHSA Homeless Resources</a></li>
        <li><a href="https://www.goodwill.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>Goodwill Job Training</a></li>
        <li><a href="https://www.area26.net/wp/" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>Area 26 Recovery (KY)</a></li>
      </ul>
      <p>Need a ride to these resources or meetings? Visit the <a href="/discussion" style={{ color: 'blue', textDecoration: 'underline' }}>Discussion Board</a> to request assistance.</p>
    </div>
  );
}

export default HomelessResources;