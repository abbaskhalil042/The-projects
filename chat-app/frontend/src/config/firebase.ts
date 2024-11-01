import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, getFirestore, setDoc } from "firebase/firestore";

import { toast } from "react-toastify";

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

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (username: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, I am using Chat App",
      lastSeen: Date.now(),
    });

    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });
  } catch (error) {
    const errorMessage =
      (error as Error).message || "An unknown error occurred";

    console.log("from signup", errorMessage);
    toast.error(errorMessage.split("/")[1]);
  }
};

const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const errorMessage =
      (error as Error).message || "An unknown error occurred";

    console.log("from login", errorMessage);
    toast.error(errorMessage.split("/")[1]);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    const errorMessage =
      (error as Error).message || "An unknown error occurred";
    toast.error(errorMessage.split("/")[1]);
  }
};

//export the getAuth function
export { auth, signup, login, logout,db };
