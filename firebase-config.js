// firebase-config.js (SEGURO para GitHub)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,           // ✅ Seguro
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,   // ✅ Seguro  
  projectId: process.env.FIREBASE_PROJECT_ID,     // ✅ Seguro
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



