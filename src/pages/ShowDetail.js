import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ShowDetail = ({ user }) => {
  const { showId: movieId } = useParams();
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShows();
  }, [movieId]);

  const fetchShows = async () => {
    try {
      const response = await api.getShows({ movieId });
      if (response.success) {
        setShows(response.data);
      }
    } catch (error) {
      console.error('Error fetching shows:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading shows...</div></div>;
  }

  if (shows.length === 0) {
    return <div className="container"><div className="error">No shows available for this movie</div></div>;
  }

  return (
    <div className="container">
      <h1>Available Shows</h1>
      <div className="grid">
        {shows.map(show => (
          <div key={show.id} className="show-card">
            <div className="show-info">
              <h3>Show Time: {show.showTime}</h3>
              <p><strong>Date:</strong> {show.showDate}</p>
              <p><strong>Theatre:</strong> {show.theatreId}</p>
              <p><strong>Price:</strong> ₹{show.price}</p>
              <p><strong>Available Seats:</strong> {show.availableSeats} / {show.totalSeats}</p>
              <button
                className="btn"
                onClick={() => navigate(`/booking/${show.id}`)}
                disabled={show.availableSeats === 0}
              >
                {show.availableSeats === 0 ? 'House Full' : 'Book Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowDetail;
