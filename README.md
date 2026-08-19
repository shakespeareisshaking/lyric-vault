# how to run the website 
Step 1 — Open PowerShell

Step 2 *- cd "C:\\Users\\Mohitha Sen\\Desktop\\Coding Projects\\creative\_outlet\\lyric-vault"*

Step 3 — Start the website
*npm run dev*

Step 4 — Open in browser

You’ll see: http://localhost:5173/
open it.


# how to update your website!!!!

Whenever you change your code:

In your project folder:
git add .
git commit -m "update"
git push

👉 Vercel will auto-update your website


# Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
# TODO: Add SDKs for Firebase products that you want to use
# https://firebase.google.com/docs/web/setup#available-libraries

# Your web app's Firebase configuration
# For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQgbFO8H-jqD6H_z3IvrElhFSS-90lpvY",
  authDomain: "lyric-vault-f83dc.firebaseapp.com",
  projectId: "lyric-vault-f83dc",
  storageBucket: "lyric-vault-f83dc.firebasestorage.app",
  messagingSenderId: "245686857686",
  appId: "1:245686857686:web:5d251b0a2ed04f7e1a3e77",
  measurementId: "G-3WW8ZJXXZP"
};

# Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


# ------------------------------------------------------------------------------------------------------------------------------


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
