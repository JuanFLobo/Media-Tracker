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
const [typeFilter, setTypeFilter] = useState('all');
const [completedFilter, setCompletedFilter] = useState('all');

 useEffect(() => {
  fetch('http://localhost:5000/api/media')
    .then((res) => {
      console.log('Response status:', res.status);
      return res.json();
    })
    .then((data) => setMedia(data))
    .catch((err) => console.error('Error fetching media:', err));
}, []);

const toggleCompleted = async (id) => {
  const item = media.find((m) => m._id === id);
  const updatedItem = { ...item, completed: !item.completed };

  const res = await fetch(`http://localhost:5000/api/media/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedItem),
  });

  const data = await res.json();
  setMedia(media.map((m) => (m._id === id ? data : m)));
};  

const deleteMedia = async (id) => {
  await fetch(`http://localhost:5000/api/media/${id}`, {
    method: 'DELETE',
  });

  setMedia(media.filter((item) => item._id !== id));
};
const filteredMedia = media.filter((item) => {
    const typeMatch = typeFilter === 'all' || item.type === typeFilter;
    const completedMatch =
      completedFilter === 'all' ||
      (completedFilter === 'true' && item.completed) ||
      (completedFilter === 'false' && !item.completed);
    return typeMatch && completedMatch;
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const newMedia = await res.json();
    setMedia([newMedia, ...media]);

   
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
      <div className="filter-container">
      <label className="filter-label">
          Type:
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="movie">Movie</option>
            <option value="book">Book</option>
            <option value="game">Game</option>
          </select>
        </label>

        <label className="filter-label">
          Completed:
          <select value={completedFilter} onChange={(e) => setCompletedFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="true">✅ Completed</option>
            <option value="false">❌ Not Completed</option>
          </select>
        </label>
      </div>
      <ul className="media-list">
        {filteredMedia.map((item) => (
    
        <li key={item._id} className="media-item">
        <strong>{item.title}</strong> ({item.type}) -
        <button onClick={() => toggleCompleted(item._id)}>
          {item.completed ? '✅' : '❌'}
        </button>
        <button onClick={() => deleteMedia(item._id)}>🗑️</button>
        <p>{item.notes}</p>
        </li>
  ))}
    </ul>
    </div>
  );
}

export default App;

