import { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import TherapyBot from './TherapyBot';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async () => {
    try {
      if (isSigningUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        console.log('Signed up and logged in:', userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        console.log('Logged in:', userCredential.user);
      }
    } catch (error) {
      console.error('Auth error:', error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    console.log('Logged out');
  };

  return (
    <div>
      <h1>Path2Sobriety</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <TherapyBot />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => setIsSigningUp(!isSigningUp)}>
            {isSigningUp ? 'Switch to Login' : 'Switch to Signup'}
          </button>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleAuth}>{isSigningUp ? 'Signup' : 'Login'}</button>
        </>
      )}
      <button onClick={() => console.log(auth)}>Test Firebase</button>
    </div>
  );
}

export default App;