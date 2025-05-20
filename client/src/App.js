import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [media, setMedia] = useState([]);
  const [form, setForm] = useState({
    type: 'movie',
    title: '',
    notes: '',
    completed: false,
  });

  useEffect(() => {
    fetch('http://localhost:5000/media')
      .then((res) => res.json())
      .then((data) => setMedia(data))
      .catch((err) => console.error('Error fetching media:', err));
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const newMedia = await res.json();
    setMedia([newMedia, ...media]);

    // Reset form
    setForm({
      type: 'movie',
      title: '',
      notes: '',
      completed: false,
    });
  };

  return (
    <div className="App">
      <h1 className="main-title">Media Tracker</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="movie">Movie</option>
          <option value="book">Book</option>
          <option value="game">Game</option>
        </select>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button type="submit">Add</button>
      </form>

      <ul>
        {media.map((item) => (
          <li key={item._id}>
            <strong>{item.title}</strong> ({item.type}) - {item.completed ? '✅' : '❌'}
            <p>{item.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

