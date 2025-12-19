import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🎬 Welcome to BookMyShow</h1>
        <p>Book your favorite movies with ease</p>
      </div>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Active Users</h3>
            <div className="number">{stats.totalUsers}</div>
          </div>
          <div className="stat-card">
            <h3>Theatres</h3>
            <div className="number">{stats.totalTheatres}</div>
          </div>
          <div className="stat-card">
            <h3>Movies</h3>
            <div className="number">{stats.totalMovies}</div>
          </div>
          <div className="stat-card">
            <h3>Shows</h3>
            <div className="number">{stats.totalShows}</div>
          </div>
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <div className="number">{stats.totalBookings}</div>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <a href="/movies" className="btn" style={{ display: 'inline-block', width: 'auto', padding: '12px 40px' }}>
          Browse Movies
        </a>
      </div>
    </div>
  );
};

export default Home;
