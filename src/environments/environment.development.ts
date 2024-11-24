// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBjsTDSob83-TyaTlJN-DsXa2PSHR2u5AE",
  authDomain: "cine-74458.firebaseapp.com",
  projectId: "cine-74458",
  storageBucket: "cine-74458.firebasestorage.app",
  messagingSenderId: "872782504332",
  appId: "1:872782504332:web:0c5b09fa9161e5dd6536a9"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);