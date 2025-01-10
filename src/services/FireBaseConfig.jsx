// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdpkQoUBP3Xlj4byocUOUvX60JWkzgdME",
  authDomain: "book-list-76e4e.firebaseapp.com",
  databaseURL: "https://book-list-76e4e-default-rtdb.firebaseio.com",
  projectId: "book-list-76e4e",
  storageBucket: "book-list-76e4e.firebasestorage.app",
  messagingSenderId: "766741896505",
  appId: "1:766741896505:web:90b1013e52bc9105a6dce8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
