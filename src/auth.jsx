import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebase';

function Sign() {
  // States
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');
  const [user, setUser] = useState(null);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Register a new user
  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        regEmail,
        regPassword
      );
      console.log('User registered:', userCredential.user);
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  // Login an existing user
  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        logEmail,
        logPassword
      );
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  // Google authentication
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User logged in with Google:', result.user);
    } catch (error) {
      console.error('Google login error:', error.message);
    }
  };

  // Logout the user
  const logout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div>
      {/* Register */}
      <h1>Register User</h1>
      <input
        type="email"
        placeholder="Email"
        value={regEmail}
        onChange={(e) => setRegEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={regPassword}
        onChange={(e) => setRegPassword(e.target.value)}
      />
      <button onClick={register}>Register</button>

      <hr />

      {/* Login */}
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={logEmail}
        onChange={(e) => setLogEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={logPassword}
        onChange={(e) => setLogPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>

      <hr />
      <button onClick={handleGoogleLogin}>Google Login</button>
      <hr />

      {/* User Info and Logout */}
      {user ? (
        <div>
          <h1>User Logged In</h1>
          <h2>Email: {user.email}</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <h2>No user is logged in</h2>
      )}
    </div>
  );
}

export default Sign;
