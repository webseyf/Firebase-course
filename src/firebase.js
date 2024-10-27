// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyCLFO4RC9DZyM1_66ICByUCDWvGogcokyg',
  authDomain: 'pedro-login-dcb23.firebaseapp.com',
  projectId: 'pedro-login-dcb23',
  storageBucket: 'pedro-login-dcb23.appspot.com',
  messagingSenderId: '715880685705',
  appId: '1:715880685705:web:1b645e3e011c421152e658',
  measurementId: 'G-Y25BJGXY9S',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
