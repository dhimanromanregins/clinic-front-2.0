import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCuU0ZFSWDDMQPtbKvUAEgsuB3aATgrN7o",
  authDomain: "halim-s-clinic.firebaseapp.com",
  projectId: "halim-s-clinic",
  storageBucket: "halim-s-clinic.firebasestorage.app",
  messagingSenderId: "529699321402",
  appId: "1:529699321402:android:6a45b1ff5e5c1f92eee703",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
