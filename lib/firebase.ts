import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCKxGaR4bomPyr-60xe2uenG2eAN5M8kYk",
  authDomain: "logistria-6f4ed.firebaseapp.com",
  projectId: "logistria-6f4ed",
  storageBucket: "logistria-6f4ed.firebasestorage.app",
  messagingSenderId: "739824851928",
  appId: "1:739824851928:web:3d68783e51716ab99bf0ad",
  measurementId: "G-4W1P8FW9KB"
};

// Next.js edge case: Prevent re-initializing Firebase during hot reloads
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);