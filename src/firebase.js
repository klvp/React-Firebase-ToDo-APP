/** @format */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwcv1OaVYTCat9MwmkdkUabJDvXw9-ntc",
  authDomain: "todo-firebase-d8f2f.firebaseapp.com",
  projectId: "todo-firebase-d8f2f",
  storageBucket: "todo-firebase-d8f2f.appspot.com",
  messagingSenderId: "502893322130",
  appId: "1:502893322130:web:c3debae9bdbebed133eb4b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
