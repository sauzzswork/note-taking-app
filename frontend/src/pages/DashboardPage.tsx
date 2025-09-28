import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const API_URL = 'http://localhost:5000/api/notes';

interface Note {
  _id: string;
  content: string;
}

interface User {
  name: string;
  email: string;
  token: string;
}

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 2. Initialize useNavigate

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchNotes(parsedUser.token);
    } else {
      // If no user is found in storage, redirect to login
      navigate('/');
    }
  }, [navigate]);

  const fetchNotes = async (token: string) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(API_URL, config);
      setNotes(data);
    } catch (error) {
      console.error('Failed to fetch notes', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent || !user) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data: newNote } = await axios.post(API_URL, { content: newNoteContent }, config);
      setNotes([...notes, newNote]);
      setNewNoteContent('');
    } catch (error) {
      console.error('Failed to create note', error);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!user) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`${API_URL}/${noteId}`, config);
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      console.error('Failed to delete note', error);
    }
  };

  // 3. Create the log off function
  const handleLogOff = () => {
    localStorage.removeItem('user'); // Clear user from storage
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          {/* 4. Add the onClick event to the button */}
          <button onClick={handleLogOff} className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Log Off
          </button>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-lg font-semibold">Welcome, {user.name}!</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        )}
        <div className="mb-8">
          <form onSubmit={handleCreateNote} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Create a New Note</h3>
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            ></textarea>
            <button type="submit" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Create Note
            </button>
          </form>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Your Notes</h3>
          {loading ? (
            <p>Loading notes...</p>
          ) : (
            <div className="space-y-4">
              {notes.length > 0 ? notes.map((note) => (
                <div key={note._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                  <p>{note.content}</p>
                  <button onClick={() => handleDeleteNote(note._id)} className="text-red-500 hover:text-red-700 font-semibold">
                    Delete
                  </button>
                </div>
              )) : <p className="text-gray-500">You don't have any notes yet.</p>}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;