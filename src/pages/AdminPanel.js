import React, { useState } from 'react';
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
      <div className="header admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage theatres, movies, and shows</p>
        <div className="admin-meta">
          <div className="admin-meta-pill">
            Signed in as: <strong>{admin?.email || admin?.name || 'Admin'}</strong>
          </div>
        </div>
      </div>

      <div className="admin-shell">
        <div className="admin-tabs">
          <button
            type="button"
            className={`admin-tab ${activeTab === 'theatre' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('theatre')}
          >
            Theatres
          </button>
          <button
            type="button"
            className={`admin-tab ${activeTab === 'movie' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('movie')}
          >
            Movies
          </button>
          <button
            type="button"
            className={`admin-tab ${activeTab === 'show' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('show')}
          >
            Shows
          </button>
        </div>

        {message && (
          <div className={`message ${message.includes('✓') ? 'success-message' : 'error-message'}`}>
            {message}
          </div>
        )}

        <div className="admin-content">
          {activeTab === 'theatre' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h2>Add Theatre</h2>
                <p>Create a new theatre location.</p>
              </div>
              <form onSubmit={handleTheatreSubmit} className="admin-form">
                <div className="form-group">
                  <label>Theatre Name</label>
                  <input
                    type="text"
                    value={theatreForm.name}
                    onChange={(e) => setTheatreForm({ ...theatreForm, name: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={theatreForm.city}
                    onChange={(e) => setTheatreForm({ ...theatreForm, city: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={theatreForm.address}
                    onChange={(e) => setTheatreForm({ ...theatreForm, address: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label>Tax Percentage</label>
                  <input
                    type="number"
                    value={theatreForm.tax}
                    onChange={(e) => setTheatreForm({ ...theatreForm, tax: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? 'Saving...' : 'Add Theatre'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'movie' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h2>Add Movie</h2>
                <p>Add a movie to be scheduled in shows.</p>
              </div>
              <form onSubmit={handleMovieSubmit} className="admin-form">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={movieForm.title}
                    onChange={(e) => setMovieForm({ ...movieForm, title: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="admin-grid-2">
                  <div className="form-group">
                    <label>Genre</label>
                    <input
                      type="text"
                      value={movieForm.genre}
                      onChange={(e) => setMovieForm({ ...movieForm, genre: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label>Language</label>
                    <input
                      type="text"
                      value={movieForm.language}
                      onChange={(e) => setMovieForm({ ...movieForm, language: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="admin-grid-2">
                  <div className="form-group">
                    <label>Duration (minutes)</label>
                    <input
                      type="number"
                      value={movieForm.duration}
                      onChange={(e) => setMovieForm({ ...movieForm, duration: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label>IMDB Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      value={movieForm.imdbRating}
                      onChange={(e) => setMovieForm({ ...movieForm, imdbRating: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? 'Saving...' : 'Add Movie'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'show' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h2>Add Show</h2>
                <p>Schedule a show for a movie at a theatre.</p>
              </div>
              <form onSubmit={handleShowSubmit} className="admin-form">
                <div className="admin-grid-2">
                  <div className="form-group">
                    <label>Movie ID</label>
                    <input
                      type="text"
                      value={showForm.movieId}
                      onChange={(e) => setShowForm({ ...showForm, movieId: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label>Theatre ID</label>
                    <input
                      type="text"
                      value={showForm.theatreId}
                      onChange={(e) => setShowForm({ ...showForm, theatreId: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="admin-grid-3">
                  <div className="form-group">
                    <label>Show Time</label>
                    <input
                      type="time"
                      value={showForm.showTime}
                      onChange={(e) => setShowForm({ ...showForm, showTime: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={showForm.date}
                      onChange={(e) => setShowForm({ ...showForm, date: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price Per Seat</label>
                    <input
                      type="number"
                      value={showForm.pricePerSeat}
                      onChange={(e) => setShowForm({ ...showForm, pricePerSeat: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? 'Saving...' : 'Add Show'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
