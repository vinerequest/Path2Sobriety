import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; // Correct for src/components/
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure installed with `npm install axios`

function DiscussionBoard() {
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState('Kentucky'); // Default
  const [userLocation, setUserLocation] = useState({ city: '', state: '' });
  const [reply, setReply] = useState({ postId: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords; // Used here, so no warning
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`);
            const { city, state } = response.data.results[0].components;
            setUserLocation({ city, state });
          } catch (error) {
            console.error('Geolocation API error:', error);
            setUserLocation({ city: 'Kentucky', state: '' });
          }
        },
        (error) => console.error('Geolocation error:', error)
      );
    }

    const q = query(collection(db, 'discussionPosts'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), replies: doc.data().replies || [] })));
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (post.trim() && auth.currentUser) {
      await addDoc(collection(db, 'discussionPosts'), {
        message: post,
        location: location || `${userLocation.city}, ${userLocation.state}` || 'Kentucky',
        timestamp: new Date(),
        userId: auth.currentUser.uid,
        replies: [],
      });
      setPost('');
    } else {
      alert('Please log in to post.');
      navigate('/login');
    }
  };

  const handleReplySubmit = async (postId) => {
    if (reply.text.trim() && auth.currentUser) {
      await updateDoc(doc(db, 'discussionPosts', postId), {
        replies: arrayUnion({
          userId: auth.currentUser.uid,
          text: reply.text,
          timestamp: new Date(),
        }),
      });
      setReply({ postId: '', text: '' });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Local Ride & Support Board</h2>
      <p>Post or reply for rides to jobs, meetings, or recovery events in your area.</p>
      <form onSubmit={handleSubmit}>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px' }}
        >
          <option value="Kentucky">Kentucky</option>
          <option value="Louisville">Louisville</option>
          <option value="Lexington">Lexington</option>
          {/* Add more locations */}
        </select>
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="Need a ride to a job interview? Post here..."
          style={{ width: '100%', height: '100px', marginBottom: '10px' }}
        />
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Post Request
        </button>
      </form>
      <div style={{ marginTop: '20px' }}>
        {posts
          .filter(p => p.location.includes(location) || p.location.includes(userLocation.city) || p.location.includes('Kentucky'))
          .map(post => (
            <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
              <p>{post.message}</p>
              <small>Location: {post.location} - Posted: {new Date(post.timestamp.toDate()).toLocaleString()}</small>
              <div style={{ marginTop: '10px' }}>
                <h4>Replies:</h4>
                {post.replies.map((reply, index) => (
                  <p key={index}><strong>{reply.userId}</strong>: {reply.text} - {new Date(reply.timestamp.toDate()).toLocaleString()}</p>
                ))}
                <input
                  value={reply.postId === post.id ? reply.text : ''}
                  onChange={(e) => setReply({ postId: post.id, text: e.target.value })}
                  placeholder="Reply here..."
                  style={{ width: '80%', padding: '5px', marginRight: '10px' }}
                />
                <button
                  onClick={() => handleReplySubmit(post.id)}
                  style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                  Reply
                </button>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={() => navigate('/')}
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default DiscussionBoard;