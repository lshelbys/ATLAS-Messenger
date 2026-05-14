import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6x45NP2k5WgyIeIQ83s24B6Z1ujeBXC0",
  authDomain: "web-messenger-5e1cf.firebaseapp.com",
  projectId: "web-messenger-5e1cf",
  storageBucket: "web-messenger-5e1cf.firebasestorage.app",
  messagingSenderId: "915313138210",
  appId: "1:915313138210:web:9cf9f709898902f718487b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);