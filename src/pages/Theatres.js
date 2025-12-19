import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Theatres = () => {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchTheatres();
  }, []);

  const fetchTheatres = async () => {
    try {
      const response = await api.getTheatres();
      if (response.success) {
        setTheatres(response.data);
        const uniqueCities = [...new Set(response.data.map(t => t.city))];
        setCities(uniqueCities);
      }
    } catch (error) {
      console.error('Error fetching theatres:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTheatres = cityFilter 
    ? theatres.filter(t => t.city === cityFilter)
    : theatres;

  if (loading) {
    return <div className="container"><div className="loading">Loading theatres...</div></div>;
  }

  return (
    <div className="container">
      <h1>🎬 Find Theatres</h1>
      
      <div className="filter-section">
        <select 
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="form-select"
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="grid">
        {filteredTheatres.length > 0 ? (
          filteredTheatres.map(theatre => (
            <div key={theatre.id} className="card">
              <h3>{theatre.name}</h3>
              <p><strong>City:</strong> {theatre.city}</p>
              <p><strong>Address:</strong> {theatre.address}</p>
              <p><strong>Tax:</strong> {theatre.tax}%</p>
              <p><strong>Status:</strong> <span style={{color: 'green'}}>● Active</span></p>
            </div>
          ))
        ) : (
          <div className="error">No theatres found for selected city</div>
        )}
      </div>
    </div>
  );
};

export default Theatres;
