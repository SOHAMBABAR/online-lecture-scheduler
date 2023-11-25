import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCifGQyLhlTaDxTEusK99B9LZJuQ5CAHF8",
    authDomain: "babar-a25d3.firebaseapp.com",
    projectId: "babar-a25d3",
    storageBucket: "babar-a25d3.appspot.com",
    messagingSenderId: "194585097670",
    appId: "1:194585097670:web:7c70443dc6e290badd6ec7",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
