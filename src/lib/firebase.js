import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDJpAX-I5o9xQ7cGMzhPKYr_rH-zr2uVY",
  authDomain: "online-lecture-scheduler.firebaseapp.com",
  projectId: "online-lecture-scheduler",
  storageBucket: "online-lecture-scheduler.appspot.com",
  messagingSenderId: "41649005985",
  appId: "1:41649005985:web:0a8b2c4d7e7fc5e39917e0",
  measurementId: "G-M0F8Y3QX2R"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
