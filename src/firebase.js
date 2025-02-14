// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCkQwjCxhxWv7bv-_stBFvQeacOeXbjaDY",
    authDomain: "pharmafind-rwanda.firebaseapp.com",
    projectId: "pharmafind-rwanda",
    storageBucket: "pharmafind-rwanda.firebasestorage.app",
    messagingSenderId: "743017928706",
    appId: "1:743017928706:web:afa2070888f25460e66f1b",
    measurementId: "G-3XEHQ6PLQR"
  };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const auth = getAuth(app); 