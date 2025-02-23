import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; // Correct for src/components/
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [sobrietyStart, setSobrietyStart] = useState('');
  const [homelessStatus, setHomelessStatus] = useState('');
  const [recoveryGoals, setRecoveryGoals] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up Firebase auth listener
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const fetchProfile = async () => {
          const docRef = doc(db, 'userProfiles', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setSobrietyStart(data.sobrietyStart || '');
            setHomelessStatus(data.homelessStatus || '');
            setRecoveryGoals(data.recoveryGoals || '');
          }
        };
        fetchProfile();
      } else {
        setSobrietyStart('');
        setHomelessStatus('');
        setRecoveryGoals('');
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []); // Empty dependency array—effect runs once on mount/unmount

  const handleSave = async (e) => {
    e.preventDefault();
    if (user) {
      await setDoc(doc(db, 'userProfiles', user.uid), {
        sobrietyStart,
        homelessStatus,
        recoveryGoals,
        userId: user.uid,
        timestamp: new Date(),
      }, { merge: true });
      alert('Profile saved!');
    }
  };

  if (!user) {
    return <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">Please log in to view your profile.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-gray-700">Sobriety Start Date</label>
          <input
            type="date"
            value={sobrietyStart}
            onChange={(e) => setSobrietyStart(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Homeless Status</label>
          <select
            value={homelessStatus}
            onChange={(e) => setHomelessStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Status</option>
            <option value="Currently Homeless">Currently Homeless</option>
            <option value="At Risk">At Risk</option>
            <option value="Housed">Housed</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Recovery Goals</label>
          <textarea
            value={recoveryGoals}
            onChange={(e) => setRecoveryGoals(e.target.value)}
            placeholder="E.g., Stay sober for 90 days, find stable housing..."
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save Profile
        </button>
      </form>
      <button
        onClick={() => navigate('/')}
        className="mt-4 bg-gray-300 p-2 rounded hover:bg-gray-400"
      >
        Back to Home
      </button>
    </div>
  );
}

export default Profile;