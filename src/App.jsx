import React, { useState, useEffect } from 'react';
import {
  Heart,
  Music,
  Trash2,
  Plus,
  Sparkles,
  Ghost
} from 'lucide-react';

import { auth, provider, db } from './firebase';

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';


const App = () => {

  // =========================
  // STATE
  // =========================

  const [songs, setSongs] = useState([]);

  const [newTitle, setNewTitle] = useState('');
  const [newLyrics, setNewLyrics] = useState('');
  const [newMood, setNewMood] = useState('Angst');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Current logged-in Google user
  const [user, setUser] = useState(null);


  // =========================
  // ADMIN LOGIN
  // =========================

  const handleAdminLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Admin login failed:', error);
    }
  };


  const handleAdminLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  // =========================
  // LOAD SONGS
  // =========================

  useEffect(() => {

    const fetchSongs = async () => {

      try {
        const querySnapshot = await getDocs(
          collection(db, 'songs')
        );

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setSongs(data);

      } catch (error) {

        console.error('Error loading songs:', error);

      }

    };

    fetchSongs();

  }, []);


  // =========================
  // CHECK LOGIN STATUS
  // =========================

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => unsubscribe();

  }, []);


  // =========================
  // ADMIN CHECK
  // =========================

  const isAdmin =
    user?.email === 'itsmohithasen@gmail.com';


  // =========================
  // POST SONG
  // =========================

  const handlePost = async (e) => {

    e.preventDefault();

    if (!newTitle.trim() || !newLyrics.trim()) {
      return;
    }

    try {

      const newSong = {
        title: newTitle,
        lyrics: newLyrics,
        date: new Date().toLocaleDateString(),
        mood: newMood
      };

      await addDoc(
        collection(db, 'songs'),
        newSong
      );

      setNewTitle('');
      setNewLyrics('');
      setNewMood('Angst');
      setIsFormOpen(false);

      // Reload songs without reloading the whole website
      const querySnapshot = await getDocs(
        collection(db, 'songs')
      );

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setSongs(data);

    } catch (error) {

      console.error('Error posting song:', error);
      alert('Something went wrong while posting 😭');

    }

  };


  // =========================
  // DELETE SONG
  // =========================

  const deleteSong = async (id) => {

    if (!isAdmin) {
      return;
    }

    const confirmed = window.confirm(
      'Delete this post permanently?'
    );

    if (!confirmed) {
      return;
    }

    try {

      await deleteDoc(
        doc(db, 'songs', id)
      );

      setSongs((currentSongs) =>
        currentSongs.filter(
          (song) => song.id !== id
        )
      );

    } catch (error) {

      console.error('Error deleting song:', error);
      alert('Could not delete this post.');

    }

  };


  // =========================
  // WEBSITE
  // =========================

  return (

    <div className="min-h-screen bg-[#1a1a1a] text-purple-100 font-sans selection:bg-purple-500 selection:text-white pb-20">

      {/* =========================
          BACKGROUND
      ========================= */}

      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">

        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full blur-[120px]"></div>

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-900 rounded-full blur-[150px]"></div>

      </div>


      {/* =========================
          HEADER
      ========================= */}

      <header className="relative pt-16 pb-12 text-center px-4">

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 drop-shadow-[0_5px_5px_rgba(168,85,247,0.4)]">

          MOHI'S LYRIC VAULT

        </h1>


        <p className="mt-4 text-purple-300 font-medium tracking-widest uppercase text-sm">

          Everything I can't say out loud

        </p>


        {/* =========================
            ADMIN LOGIN
        ========================= */}

        <div className="mt-5">

          {!user && (

            <button
              onClick={handleAdminLogin}
              className="text-xs text-purple-400 hover:text-purple-200 transition underline"
            >

              Admin login

            </button>

          )}


          {user && isAdmin && (

            <div className="flex items-center justify-center gap-3">

              <span className="text-xs text-green-400">

                Admin mode ✨

              </span>

              <button
                onClick={handleAdminLogout}
                className="text-xs text-purple-400 hover:text-red-400 transition underline"
              >

                logout

              </button>

            </div>

          )}


          {user && !isAdmin && (

            <div className="flex items-center justify-center gap-3">

              <span className="text-xs text-red-400">

                Not admin

              </span>

              <button
                onClick={handleAdminLogout}
                className="text-xs text-purple-400 hover:text-red-400 transition underline"
              >

                logout

              </button>

            </div>

          )}

        </div>


        {/* =========================
            TAGS
        ========================= */}

        <div className="flex justify-center gap-4 mt-6">

          <span className="bg-purple-900/50 border border-purple-500/30 px-3 py-1 rounded-full text-xs flex items-center gap-2">

            <Heart
              size={12}
              className="text-yellow-400"
            />

            feel too much?

          </span>


          <span className="bg-purple-900/50 border border-purple-500/30 px-3 py-1 rounded-full text-xs flex items-center gap-2">

            <Ghost
              size={12}
              className="text-purple-300"
            />

            burnout

          </span>

        </div>

      </header>


      {/* =========================
          MAIN
      ========================= */}

      <main className="max-w-4xl mx-auto px-6 relative z-10">


        {/* =========================
            POST BUTTON / FORM
        ========================= */}

        <div className="flex justify-center mb-12">


          {/* POST BUTTON */}

          {!isFormOpen && (

            <button
              onClick={() => setIsFormOpen(true)}
              className="group relative flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(147,51,234,0.4)]"
            >

              <Plus size={20} />

              Post your Masterpiece

              <Sparkles
                className="absolute -top-2 -right-2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity"
                size={20}
              />

            </button>

          )}


          {/* POST FORM */}

          {isFormOpen && (

            <div className="w-full bg-[#2a2a2a] border-2 border-dashed border-purple-500/50 rounded-3xl p-8 animate-in fade-in zoom-in duration-300">


              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold italic">

                  New Entry...

                </h2>


                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-purple-400 hover:text-white"
                >

                  Cancel

                </button>

              </div>


              <form
                onSubmit={handlePost}
                className="space-y-4"
              >


                <input
                  type="text"
                  placeholder="Song Title (make it dramatic)"
                  value={newTitle}
                  onChange={(e) =>
                    setNewTitle(e.target.value)
                  }
                  className="w-full bg-black/40 border border-purple-800/50 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xl font-bold"
                />


                <textarea
                  placeholder="Write your thoughts, feelings, or poems here..."
                  value={newLyrics}
                  onChange={(e) =>
                    setNewLyrics(e.target.value)
                  }
                  className="w-full bg-black/40 border border-purple-800/50 rounded-lg p-4 min-h-[200px]"
                />


                <button
                  type="submit"
                  className="bg-white text-purple-900 px-6 py-2 rounded-lg font-bold hover:bg-purple-100 transition"
                >

                  Post

                </button>


              </form>

            </div>

          )}

        </div>


        {/* =========================
            LYRICS FEED
        ========================= */}

        <div className="grid gap-8">

          {songs.map((song) => (

            <article
              key={song.id}
              className="relative group bg-[#f3f4f6] text-[#2d2d2d] rounded-sm shadow-xl p-8 md:p-12 transform rotate-[-0.5deg] hover:rotate-0 transition-transform duration-500 overflow-hidden"

              style={{
                backgroundImage:
                  'repeating-linear-gradient(#f3f4f6, #f3f4f6 31px, #e5e7eb 31px, #e5e7eb 32px)',

                backgroundAttachment: 'local',

                lineHeight: '32px'
              }}
            >


              {/* TAPE */}

              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-32 h-10 bg-purple-400/30 backdrop-blur-sm transform rotate-2 pointer-events-none"></div>


              {/* =========================
                  TITLE AREA
              ========================= */}

              <div className="flex justify-between items-start mb-6 border-b-2 border-purple-200 pb-2">


                <div>

                  <h3 className="text-4xl font-black tracking-tighter text-purple-900 uppercase">

                    {song.title}

                  </h3>


                  <div className="flex items-center gap-4 mt-2">

                    <span className="text-xs font-mono uppercase tracking-widest text-purple-600 font-bold bg-purple-100 px-2 py-0.5 rounded">

                      {song.date}

                    </span>


                    <span className="text-xs italic text-gray-500">

                      Mood: {song.mood}

                    </span>

                  </div>

                </div>


                {/* =========================
                    ADMIN DELETE BUTTON
                ========================= */}

                {isAdmin && (

                  <button
                    onClick={() =>
                      deleteSong(song.id)
                    }
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete this post"
                  >

                    <Trash2 size={20} />

                  </button>

                )}

              </div>


              {/* =========================
                  LYRICS
              ========================= */}

              <div className="relative mt-8">

                <pre className="whitespace-pre-wrap font-serif text-lg md:text-xl leading-relaxed italic text-gray-800">

                  {song.lyrics}

                </pre>


                {/* VISUAL FLAIR */}

                <div className="mt-12 flex justify-between items-center opacity-60">

                  <div className="flex gap-2">

                    <Heart
                      className="text-purple-500 fill-purple-500"
                      size={16}
                    />

                    <Music
                      className="text-purple-500"
                      size={16}
                    />

                    <Heart
                      className="text-purple-500 fill-purple-500"
                      size={16}
                    />

                  </div>


                  <div className="text-[10px] font-mono tracking-widest uppercase">

                    Property of a Teenage Dreamer

                  </div>

                </div>

              </div>


              {/* TORN EDGE */}

              <div
                className="absolute bottom-0 left-0 right-0 h-2 opacity-10"
                style={{
                  backgroundImage:
                    "url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')"
                }}
              ></div>


            </article>

          ))}

        </div>


        {/* =========================
            EMPTY STATE
        ========================= */}

        {songs.length === 0 && (

          <div className="text-center py-20 opacity-40">

            <Music
              size={64}
              className="mx-auto mb-4"
            />

            <p className="text-xl font-serif italic">

              Your scrapbook is empty. Start your era.

            </p>

          </div>

        )}

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="mt-20 text-center text-purple-400/50 text-xs tracking-[0.3em] uppercase pb-10">

        © {new Date().getFullYear()} Vault of secrets by Mohitha Sen

      </footer>

    </div>

  );

};


export default App;