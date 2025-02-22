import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Adjust the import path as needed
import { collection, query, orderBy, limit, onSnapshot, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import for navigation

function TherapyBot() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Update state when user logs in or out
    });

    if (user) {
      const q = query(
        collection(db, 'therapyChats'),
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });

      return () => {
        unsubscribeAuth();
        unsubscribeFirestore();
      };
    }

    return () => unsubscribeAuth(); // Clean up even if no user
  }, [user]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.trim() && user) {
      await addDoc(collection(db, 'therapyChats'), {
        userId: user.uid,
        message: message,
        timestamp: new Date().toISOString(),
      });
      setMessage('');
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <p className="text-gray-500">Please log in to chat with the therapy bot.</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Therapy Bot</h2>
      <nav className="mb-4 space-y-2">
        <button
          onClick={() => navigate('/login')}
          className="bg-gray-300 p-2 rounded hover:bg-gray-400"
        >
          Back to Login
        </button>
        <button
          onClick={() => navigate('/recovery-plans')}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          View Recovery Plans
        </button>
        <button
          onClick={() => navigate('/progress')}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          View Progress
        </button>
      </nav>
      <div className="h-64 overflow-y-auto mb-4 border rounded p-2">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <span className="font-bold">{msg.userId === user.uid ? 'You' : 'Bot'}:</span> {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default TherapyBot;