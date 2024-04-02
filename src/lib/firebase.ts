// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJTB4dyFOcCNVEYw5fiCbIG1mCvm_QhVE",
  authDomain: "see-food-fmi.firebaseapp.com",
  projectId: "see-food-fmi",
  storageBucket: "see-food-fmi.appspot.com",
  messagingSenderId: "986108641648",
  appId: "1:986108641648:web:1c831244f9dca46244cfb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);