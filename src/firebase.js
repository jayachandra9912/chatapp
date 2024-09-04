// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyC4gVwjhbfWWI3ZpQ-wBx30mXSXQjKQgGo",
    authDomain: "chat-dfa2a.firebaseapp.com",
    projectId: "chat-dfa2a",
    storageBucket: "chat-dfa2a.appspot.com",
    messagingSenderId: "856801582059",
    appId: "1:856801582059:web:30ced69af08fdfc35c17ae",
    measurementId: "G-7EWVJYLX16"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()