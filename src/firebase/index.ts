import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDj2f9yKmIdjPHQ0USfm5CRB05DHttMHVw",
  authDomain: "futsal-team-7a963.firebaseapp.com",
  projectId: "futsal-team-7a963",
  storageBucket: "futsal-team-7a963.firebasestorage.app",
  messagingSenderId: "496159053019",
  appId: "1:496159053019:web:c333c6b135b2a7761128fe",
  measurementId: "G-4C288FS555"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
