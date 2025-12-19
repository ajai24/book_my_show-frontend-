import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminPanel = ({ admin }) => {
  const [activeTab, setActiveTab] = useState('theatre');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [theatreForm, setTheatreForm] = useState({
    name: '',
    city: '',
    address: '',
    tax: ''
  });

  const [movieForm, setMovieForm] = useState({
    title: '',
    genre: '',
    language: '',
    duration: '',
    imdbRating: ''
  });

  const [showForm, setShowForm] = useState({
    movieId: '',
    theatreId: '',
    showTime: '',
    date: '',
    pricePerSeat: ''
  });

  if (!admin) {
    return <div className="error">Access Denied. Admin login required.</div>;
  }

  const handleTheatreSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const theatreData = {
        name: theatreForm.name,
        city: theatreForm.city,
        address: theatreForm.address,
        taxPercentage: parseFloat(theatreForm.tax),
        adminId: admin.id
      };
      const response = await api.addTheatre(theatreData);
      if (response.success) {
        setMessage('✓ Theatre added successfully!');
        setTheatreForm({ name: '', city: '', address: '', tax: '' });
      } else {
        setMessage('✗ ' + (response.error || 'Failed to add theatre'));
      }
    } catch (error) {
      setMessage('✗ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const movieData = {
        title: movieForm.title,
        genre: movieForm.genre,
        language: movieForm.language,
        duration: parseInt(movieForm.duration),
        imdbRating: parseFloat(movieForm.imdbRating)
      };
      const response = await api.addMovie(movieData);
      if (response.success) {
        setMessage('✓ Movie added successfully!');
        setMovieForm({ title: '', genre: '', language: '', duration: '', imdbRating: '' });
      } else {
        setMessage('✗ ' + (response.error || 'Failed to add movie'));
      }
    } catch (error) {
      setMessage('✗ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const showData = {
        movieId: showForm.movieId,
        theatreId: showForm.theatreId,
        showTime: showForm.showTime,
        showDate: showForm.date,
        price: parseFloat(showForm.pricePerSeat),
        totalSeats: 100  // 10x10 grid
      };
      const response = await api.addShow(showData);
      if (response.success) {
        setMessage('✓ Show added successfully!');
        setShowForm({ movieId: '', theatreId: '', showTime: '', date: '', pricePerSeat: '' });
      } else {
        setMessage('✗ ' + (response.error || 'Failed to add show'));
      }
    } catch (error) {
      setMessage('✗ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🎯 Admin Dashboard</h1>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button 
          className={`btn ${activeTab === 'theatre' ? 'active' : ''}`}
          onClick={() => setActiveTab('theatre')}
        >
          🏢 Theatres
        </button>
        <button 
          className={`btn ${activeTab === 'movie' ? 'active' : ''}`}
          onClick={() => setActiveTab('movie')}
        >
          🎬 Movies
        </button>
        <button 
          className={`btn ${activeTab === 'show' ? 'active' : ''}`}
          onClick={() => setActiveTab('show')}
        >
          🎞️ Shows
        </button>
      </div>

      {message && <div className={message.includes('✓') ? 'success' : 'error'}>{message}</div>}

      {activeTab === 'theatre' && (
        <form onSubmit={handleTheatreSubmit} className="form">
          <h2>Add New Theatre</h2>
          <input
            type="text"
            placeholder="Theatre Name"
            value={theatreForm.name}
            onChange={(e) => setTheatreForm({...theatreForm, name: e.target.value})}
            className="form-input"
            required
          />
          <input
            type="text"
            placeholder="City"
            value={theatreForm.city}
            onChange={(e) => setTheatreForm({...theatreForm, city: e.target.value})}
            className="form-input"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={theatreForm.address}
            onChange={(e) => setTheatreForm({...theatreForm, address: e.target.value})}
            className="form-input"
            required
          />
          <input
            type="number"
            placeholder="Tax Percentage"
            value={theatreForm.tax}
            onChange={(e) => setTheatreForm({...theatreForm, tax: e.target.value})}
            className="form-input"
            required
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Theatre'}
          </button>
        </form>
      )}

      {activeTab === 'movie' && (
        <form onSubmit={handleMovieSubmit} className="form">
          <h2>Add New Movie</h2>
          <input
            type="text"
            placeholder="Movie Title"
            value={movieForm.title}
            onChange={(e) => setMovieForm({...movieForm, title: e.target.value})}
            className="form-input"
            required
          />
          <input
            type="text"
            placeholder="Genre"
            value={movieForm.genre}
            onChange={(e) => setMovieForm({...movieForm, genre: e.target.value})}
            className="form-input"
            required
          />
          <input
            type="text"
            placeholder="Language"
            value={movieForm.language}
            onChange={(e) => setMovieForm({...movieForm, language: e.target.value})}
            className="form-input"
            required
          />
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={movieForm.duration}
            onChange={(e) => setMovieForm({...movieForm, duration: e.target.value})}
            className="form-input"
            required
          />
          <input
            type="number"
            placeholder="IMDB Rating"
            step="0.1"
            value={movieForm.imdbRating}
            onChange={(e) => setMovieForm({...movieForm, imdbRating: e.target.value})}
            className="form-input"
            required
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Movie'}
          </button>
        </form>
      )}

      {activeTab === 'show' && (
        <form onSubmit={handleShowSubmit} className="form">
          <h2>Add New Show</h2>
          <input
            type="text"
            placeholder="Movie ID"
            value={showForm.movieId}
            onChange={(e) => setShowForm({...showForm, movieId: e.target.value})}
            className="form-input"
            required
          />
          <input
            type="text"
            placeholder="Theatre ID"
            value={showForm.theatreId}
            onChange={(e) => setShowForm({...showForm, theatreId: e.target.value})}
            className="form-input"
            required
          />
          <input
            type="time"
            placeholder="Show Time"
            value={showForm.showTime}
            onChange={(e) => setShowForm({...showForm, showTime: e.target.value})}
            className="form-input"
            required
          />
          <input
            type="date"
            placeholder="Date"
            value={showForm.date}
            onChange={(e) => setShowForm({...showForm, date: e.target.value})}
            className="form-input"
            required
          />
          <input
            type="number"
            placeholder="Price Per Seat"
            value={showForm.pricePerSeat}
            onChange={(e) => setShowForm({...showForm, pricePerSeat: e.target.value})}
            className="form-input"
            required
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Show'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminPanel;
