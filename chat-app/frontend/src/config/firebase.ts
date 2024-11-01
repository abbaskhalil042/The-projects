import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAXkKND3i5zFUz0hTLJe1IN-JTJIM-TErs",
  authDomain: "chat-app-d5f8d.firebaseapp.com",
  projectId: "chat-app-d5f8d",
  storageBucket: "chat-app-d5f8d.appspot.com",
  messagingSenderId: "20234587374",
  appId: "1:20234587374:web:cb9594750960d24363b7ff",
  measurementId: "G-BBTWDBF6R7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()

//export the getAuth function
export {
   auth
  }