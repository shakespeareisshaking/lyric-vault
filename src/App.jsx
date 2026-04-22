import React, { useState, useEffect } from 'react';
import { Heart, Music, Send, Trash2, Plus, Sparkles, Star, Ghost } from 'lucide-react';

import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const App = () => {

  // ✅ state (ONLY data here)
  const [songs, setSongs] = useState([]);

  const [newTitle, setNewTitle] = useState('');
  const [newLyrics, setNewLyrics] = useState('');
  const [newMood, setNewMood] = useState('Angst');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // ✅ useEffect OUTSIDE useState
  useEffect(() => {
    const fetchSongs = async () => {
      const querySnapshot = await getDocs(collection(db, "songs"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSongs(data);
    };

    fetchSongs();
  }, []);

  // ✅ handlePost (correct)
  const handlePost = async (e) => {
    e.preventDefault();
    if (!newTitle || !newLyrics) return;

    const newSong = {
      title: newTitle,
      lyrics: newLyrics,
      date: new Date().toLocaleDateString(),
      mood: newMood
    };

    await addDoc(collection(db, "songs"), newSong);

    setNewTitle('');
    setNewLyrics('');
    setIsFormOpen(false);

    window.location.reload();
  };

  const deleteSong = (id) => {
    setSongs(songs.filter(song => song.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-purple-100 font-sans selection:bg-purple-500 selection:text-white pb-20">
      {/* Aesthetic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-900 rounded-full blur-[150px]"></div>
      </div>

      {/* Header */}
      <header className="relative pt-16 pb-12 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 drop-shadow-[0_5px_5px_rgba(168,85,247,0.4)]">
          MOHI'S LYRIC VAULT
        </h1>
        <p className="mt-4 text-purple-300 font-medium tracking-widest uppercase text-sm">
          Everything I can't say out loud 
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <span className="bg-purple-900/50 border border-purple-500/30 px-3 py-1 rounded-full text-xs flex items-center gap-2">
            <Heart size={12} className="text-yellow-400" /> feel too much?
          </span>
          <span className="bg-purple-900/50 border border-purple-500/30 px-3 py-1 rounded-full text-xs flex items-center gap-2">
            <Ghost size={12} className="text-purple-300" /> burnout
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Post Button */}
        <div className="flex justify-center mb-12">
          {!isFormOpen ? (
            <button 
              onClick={() => setIsFormOpen(true)}
              className="group relative flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(147,51,234,0.4)]"
            >
              <Plus size={20} />
              Spill Your Beans
              <Sparkles className="absolute -top-2 -right-2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
            </button>
          ) : (
            <div className="w-full bg-[#2a2a2a] border-2 border-dashed border-purple-500/50 rounded-3xl p-8 animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold italic">New Entry...</h2>
                <button onClick={() => setIsFormOpen(false)} className="text-purple-400 hover:text-white">Cancel</button>
              </div>
              <form onSubmit={handlePost} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Song Title (make it dramatic)" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-black/40 border border-purple-800/50 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xl font-bold"
                />
                <textarea 
                  placeholder="Write the lyrics that would make them regret everything..."
                  value={newLyrics}
                  onChange={(e) => setNewLyrics(e.target.value)}
                  className="w-full bg-black/40 border border-purple-800/50 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[200px] leading-relaxed"
                />
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-purple-400 uppercase tracking-widest font-bold">Mood:</label>
                    <select 
                      value={newMood}
                      onChange={(e) => setNewMood(e.target.value)}
                      className="bg-purple-900/50 border border-purple-700 rounded-md px-3 py-1 text-sm focus:outline-none"
                    >
                      <option>Angst</option>
                      <option>Heartbroken</option>
                      <option>Vengeful</option>
                      <option>Nostalgic</option>
                      <option>Relieved</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="bg-white text-purple-900 hover:bg-purple-100 px-8 py-3 rounded-lg font-black uppercase tracking-tighter flex items-center gap-2 transition-colors"
                  >
                    Post it! <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Lyrics Feed */}
        <div className="grid gap-8">
          {songs.map((song) => (
            <article 
              key={song.id}
              className="relative group bg-[#f3f4f6] text-[#2d2d2d] rounded-sm shadow-xl p-8 md:p-12 transform rotate-[-0.5deg] hover:rotate-0 transition-transform duration-500 overflow-hidden"
              style={{
                backgroundImage: 'repeating-linear-gradient(#f3f4f6, #f3f4f6 31px, #e5e7eb 31px, #e5e7eb 32px)',
                backgroundAttachment: 'local',
                lineHeight: '32px'
              }}
            >
              {/* Decorative "Tape" */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-32 h-10 bg-purple-400/30 backdrop-blur-sm transform rotate-2 pointer-events-none"></div>
              
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
                <button 
                  onClick={() => deleteSong(song.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="relative mt-8">
                <pre className="whitespace-pre-wrap font-serif text-lg md:text-xl leading-relaxed italic text-gray-800">
                  {song.lyrics}
                </pre>
                
                {/* Visual Flair */}
                <div className="mt-12 flex justify-between items-center opacity-60">
                  <div className="flex gap-2">
                    <Heart className="text-purple-500 fill-purple-500" size={16} />
                    <Music className="text-purple-500" size={16} />
                    <Heart className="text-purple-500 fill-purple-500" size={16} />
                  </div>
                  <div className="text-[10px] font-mono tracking-widest uppercase">
                    Property of a Teenage Dreamer
                  </div>
                </div>
              </div>

              {/* Torn edge effect at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-10"></div>
            </article>
          ))}
        </div>

        {songs.length === 0 && (
          <div className="text-center py-20 opacity-40">
            <Music size={64} className="mx-auto mb-4" />
            <p className="text-xl font-serif italic">Your scrapbook is empty. Start your era.</p>
          </div>
        )}
      </main>

      <footer className="mt-20 text-center text-purple-400/50 text-xs tracking-[0.3em] uppercase pb-10">
        © {new Date().getFullYear()} Vault of Unsent Messages by Mohitha Sen
      </footer>
    </div>
  );
};

export default App;
