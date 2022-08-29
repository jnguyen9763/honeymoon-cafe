// Import SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPidYZDk2TIf2qIUx8RVhxjEGG47mswb4",
  authDomain: "honeymoon-cafe.firebaseapp.com",
  projectId: "honeymoon-cafe",
  storageBucket: "honeymoon-cafe.appspot.com",
  messagingSenderId: "535639647536",
  appId: "1:535639647536:web:631da69b582d3e8ee454f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
