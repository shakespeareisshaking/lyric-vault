# 🎵 Mohi's Lyric Vault

> Everything I can't say out loud.


A personal lyric archive built with React, Firebase, and Tailwind CSS.  
A little digital scrapbook for storing songs, lyrics, moods, and the occasional emotional damage. 💜


## ✨ Features

- 📝 **Create lyric entries**
  - Add a song title
  - Write and save lyrics
  - Assign a mood to each entry

- ☁️ **Cloud database**
  - Songs are stored using Firebase Firestore
  - Entries persist across devices
  - New posts can be added from anywhere

- 👑 **Admin controls**
  - Google authentication for the site owner
  - Admin-only delete controls
  - Regular visitors can view and create posts without seeing admin controls

- 🎨 **Scrapbook-inspired UI**
  - Dark purple aesthetic
  - Notebook-style lyric cards
  - Decorative tape and handwritten-style elements
  - Responsive design for desktop and mobile

- 🌐 **Deployed online**
  - Hosted with Vercel
  - Automatically updates when changes are pushed to GitHub

---

## 🛠️ Tech Stack

**React** - Frontend UI 
**Vite** - Development environment and build tool
**Tailwind CSS** - Styling
**Firebase Firestore** - Database 
**Firebase Authentication** - Admin login
**Lucide React** - Icons
**Vercel** - Deployment
**GitHub** - Version control |

---

## 📂 Project Structure

lyric-vault/
│
├── public/
│
├── src/
│   ├── App.jsx          # Main application
│   ├── firebase.js      # Firebase configuration
│   ├── main.jsx         # React entry point
│   └── ...
│
├── index.html
├── package.json
├── vite.config.js
└── README.md

# Running Locally
1. Clone the repository
git clone https://github.com/shakespeareisshaking/lyric-vault.git
2. Enter the project
cd lyric-vault
3. Install dependencies
npm install
4. Start the development server
npm run dev

Vite will provide a local address, usually:

http://localhost:5173


# Firebase

The application uses Firebase for:
Firestore

All lyric entries are stored in a Firestore collection called:
songs

Each song contains information such as:

{
  title: "Song Title",
  lyrics: "Lyrics go here...",
  date: "8/19/2026",
  mood: "Angst"
}

# Authentication
Firebase Authentication is used for the admin login.
The site owner can authenticate using Google and access administrative controls such as deleting posts.

# 👑 Admin System
The application checks the authenticated user's email:
const isAdmin =
  user?.email === 'example@email.com';
If the authenticated user matches the configured admin account, additional controls become available.

# Regular visitor
Visitors can:
View lyrics
Create posts
Browse the vault
Admin

The admin can additionally:
Delete posts
Access admin mode
Log out of the admin account
🌐 Deployment

The project is deployed using Vercel.

The deployment is connected to the GitHub repository, so **changes can be published by pushing commits:**

git add .
git commit -m "Update lyric vault"
git push

Vercel automatically builds and deploys the latest version.

# 🎨 Design
The interface is inspired by a combination of:
personal journals
lyric notebooks
digital scrapbooks
late-night purple aesthetics

Each lyric is displayed as a notebook-style card with decorative elements to make the site feel more personal than a standard CRUD application.

# 🧠 What I Learned

This project helped me learn and practice:
React components
React state with useState
React effects with useEffect
Handling forms
Fetching data from Firestore
Adding documents to Firestore
Deleting documents from Firestore
Firebase authentication
Conditional rendering
Admin access logic
Git and GitHub
Vercel deployment
Debugging frontend errors
Connecting a frontend application to a cloud database
🔮 Future Ideas

Possible future improvements:
❤️ Like/favourite system
🔍 Search through lyrics
🎭 Filter entries by mood
✏️ Edit existing posts
📅 Sort entries by date
🎵 Add artist information
🖼️ Add album artwork
🌙 More visual themes
📱 Further mobile optimisation
📊 Personal writing statistics
🔒 More robust server-side admin permissions
📜 License

This project is a personal creative project.
The source code is available for learning and experimentation, but the lyrics and other original creative content belong to their respective creators.

💜 About
Mohi's Lyric Vault started as a small personal coding project and evolved into a full web application with a React frontend, cloud database, authentication, and automated deployment.
Built with questionable amounts of purple.

Made by Mohitha Sen.



### One important thing before you push this


Since your GitHub repo is public, **make sure `firebase.js` doesn't contain anything you consider secret** such as service-account credentials or private API keys.


Your Firebase **web config/API key is generally not treated like a password**, but your Firestore Security Rules and authentication configuration are what actually protect your database.


Also, I'd **not put your personal admin email directly in the README**. The code can contain it for now, but eventually we can move that into an environment variable so the repo is cleaner.


And honestly, the **Future Ideas** section is doing some heavy lifting here. It makes this look like an actively developed project rather than “I followed a tutorial and stopped.” 😭

