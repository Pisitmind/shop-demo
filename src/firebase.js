// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // นำเข้า GoogleAuthProvider

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGA8hq9i3EIVmdS9SqXutDT4ZFqLSTbp0",
  authDomain: "fir-shop-mind.firebaseapp.com",
  projectId: "fir-shop-mind",
  storageBucket: "fir-shop-mind.firebasestorage.app",
  messagingSenderId: "908059791714",
  appId: "1:908059791714:web:b5a89dafea53a27aa45c3b",
  measurementId: "G-CDBV5BNL71",
};

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export const auth = getAuth(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider(); // สร้าง GoogleAuthProvider

// Get the Firebase Authentication instance
const auth = getAuth(app);

// Get the Firestore instance (db)
const db = getFirestore(app);

// Export the necessary instances
export { auth, db, googleProvider };
