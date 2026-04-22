Step 1 — Open PowerShell



Step 2 *- cd "C:\\Users\\Mohitha Sen\\Desktop\\Coding Projects\\creative\_outlet\\lyric-vault"*



Step 3 — Start the website

*npm run dev*



Step 4 — Open in browser

You’ll see: http://localhost:5173/
open it.


How to update your website!!!!

Whenever you change your code:

In your project folder:
git add .
git commit -m "update"
git push

👉 Vercel will auto-update your website


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQgbFO8H-jqD6H_z3IvrElhFSS-90lpvY",
  authDomain: "lyric-vault-f83dc.firebaseapp.com",
  projectId: "lyric-vault-f83dc",
  storageBucket: "lyric-vault-f83dc.firebasestorage.app",
  messagingSenderId: "245686857686",
  appId: "1:245686857686:web:5d251b0a2ed04f7e1a3e77",
  measurementId: "G-3WW8ZJXXZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);