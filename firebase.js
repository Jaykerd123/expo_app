// Firebase initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB3qjS6ymOLY-ojw6ax8JzFvGoYvdTkoCA",
  authDomain: "expoapp-60273.firebaseapp.com",
  projectId: "expoapp-60273",
  storageBucket: "expoapp-60273.firebasestorage.app",
  messagingSenderId: "1065375242723",
  appId: "1:1065375242723:web:7152fd213aec2f5d8d28d6",
  measurementId: "G-T30HWGL5R2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
