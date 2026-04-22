import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQgbFO8H-jqD6H_z3IvrElhFSS-90lpvY",
  authDomain: "lyric-vault-f83dc.firebaseapp.com",
  projectId: "lyric-vault-f83dc",
  storageBucket: "lyric-vault-f83dc.firebasestorage.app",
  messagingSenderId: "245686857686",
  appId: "1:245686857686:web:5d251b0a2ed04f7e1a3e77"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);