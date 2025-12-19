import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await api.getMovies();
      if (response.success) {
        setMovies(response.data);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="container"><div className="loading">Loading movies...</div></div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🎬 Movies</h1>
        <p>Browse and select your favorite movies</p>
      </div>

      <div className="form-group" style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px' }}
        />
      </div>

      {filteredMovies.length === 0 ? (
        <div className="error">No movies found</div>
      ) : (
        <div className="grid">
          {filteredMovies.map(movie => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.posterUrl || 'https://via.placeholder.com/250x350?text=' + movie.title}
                alt={movie.title}
              />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <p><strong>Language:</strong> {movie.language}</p>
                <p><strong>Duration:</strong> {movie.duration} mins</p>
                {movie.imdbRating && (
                  <p><span className="rating">⭐ {movie.imdbRating}</span></p>
                )}
                <Link
                  to={`/show/${movie.id}`}
                  className="btn"
                  style={{ textDecoration: 'none', display: 'block', textAlign: 'center', marginTop: '10px' }}
                >
                  View Shows
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
