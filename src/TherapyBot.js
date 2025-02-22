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
    <div>
      <h2>Talk to Your Therapy Bot</h2>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="How are you feeling?"
      />
      <button onClick={handleMessage}>Send</button>
      <p>{response}</p>
      <h3>Previous Chats</h3>
      <ul>
        {chats.map(chat => (
          <li key={chat.id}>
            You: {chat.message} | Bot: {chat.response} | Time: {chat.timestamp.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TherapyBot;