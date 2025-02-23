import React, { useState } from 'react';
import { auth, db } from '../firebase'; // Correct for src/components/
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save basic profile data to Firestore
      await setDoc(doc(db, 'userProfiles', user.uid), {
        email: user.email,
        userId: user.uid,
        sobrietyStart: '', // Can be updated later in Profile.jsx
        homelessStatus: '', // Can be updated later in Profile.jsx
        recoveryGoals: '', // Can be updated later in Profile.jsx
        timestamp: new Date(),
      });

      // Redirect to login or profile after successful registration
      navigate('/login');
      alert('Registration successful! Please log in.');
    } catch (err) {
      setError('Failed to register. ' + (err.message || 'Check your email and password.'));
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Log in here
        </Link>
      </p>
    </div>
  );
}

export default Register;