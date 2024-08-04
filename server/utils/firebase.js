import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

dotenv.config();

console.log(process.env.OPEN_AI_APIKEY);

// const firebaseConfig = {
//   apiKey: 'AIzaSyAaY2xhPX0-18e60RGxCf6N6yfgtGZlKHY',
//   authDomain: 'fir-training-1b7d6.firebaseapp.com',
//   projectId: 'fir-training-1b7d6',
//   storageBucket: 'fir-training-1b7d6.appspot.com',
//   messagingSenderId: '115418467729',
//   appId: '1:115418467729:web:461d1d484b0ab80e785e30',
// };
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
