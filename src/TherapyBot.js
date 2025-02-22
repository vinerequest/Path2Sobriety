import { useState, useEffect } from 'react';
import { db, auth } from './firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

function TherapyBot() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      const q = query(collection(db, 'therapyChats'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const chatList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).filter(chat => chat.userId === auth.currentUser.uid);
        setChats(chatList);
      });
      return () => unsubscribe();
    }
  }, []);

  const handleMessage = async () => {
    let botResponse = '';
    if (message.toLowerCase().includes('stressed')) {
      botResponse = 'I hear you. Stress can be tough—want to tell me more?';
    } else if (message.toLowerCase().includes('sad')) {
      botResponse = 'I’m sorry you’re feeling sad. I’m here for you.';
    } else {
      botResponse = 'Thanks for sharing. How can I support you today?';
    }
    setResponse(botResponse);
    console.log('Current user:', auth.currentUser);
    console.log('Firestore instance:', db);
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, 'therapyChats'), {
          userId: user.uid,
          message: message,
          response: botResponse,
          timestamp: new Date()
        });
        console.log('Chat saved for user:', user.uid);
      }
    } catch (e) {
      console.error('Error saving chat: ', e);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Talk to Your Therapy Bot</h2>
      <div className="flex mb-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How are you feeling?"
          className="w-full p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleMessage}
          className="bg-indigo-500 text-white py-2 px-4 rounded-r hover:bg-indigo-600 transition duration-300"
        >
          Send
        </button>
      </div>
      <p className="text-gray-700 mb-4">{response || 'Your response will appear here...'}</p>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Previous Chats</h3>
      <ul className="list-disc pl-5 text-gray-600">
        {chats.map(chat => (
          <li key={chat.id} className="mb-2">
            You: <span className="font-medium">{chat.message}</span> | Bot: <span className="font-medium">{chat.response}</span> | Time: {new Date(chat.timestamp.seconds * 1000).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TherapyBot;