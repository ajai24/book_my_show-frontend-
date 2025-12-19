const API_BASE_URL = 'http://localhost:8080/api';

const api = {
  // User Authentication
  registerUser: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  loginUser: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  // Admin Authentication
  registerAdmin: async (adminData) => {
    const response = await fetch(`${API_BASE_URL}/admin/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData),
    });
    return response.json();
  },

  loginAdmin: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  // Movies
  getMovies: async () => {
    const response = await fetch(`${API_BASE_URL}/movies`);
    return response.json();
  },

  addMovie: async (movieData) => {
    const response = await fetch(`${API_BASE_URL}/movies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieData),
    });
    return response.json();
  },

  // Theatres
  getTheatres: async (city = null) => {
    const url = city ? `${API_BASE_URL}/theatres?city=${city}` : `${API_BASE_URL}/theatres`;
    const response = await fetch(url);
    return response.json();
  },

  addTheatre: async (theatreData) => {
    const response = await fetch(`${API_BASE_URL}/theatres`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(theatreData),
    });
    return response.json();
  },

  // Shows
  getShows: async (filters = {}) => {
    let url = `${API_BASE_URL}/shows`;
    const params = new URLSearchParams();
    
    if (filters.movieId) params.append('movieId', filters.movieId);
    if (filters.theatreId) params.append('theatreId', filters.theatreId);
    
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await fetch(url);
    return response.json();
  },

  addShow: async (showData) => {
    const response = await fetch(`${API_BASE_URL}/shows`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(showData),
    });
    return response.json();
  },

  // Bookings
  bookSeats: async (bookingData) => {
    const response = await fetch(`${API_BASE_URL}/book-seats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    return response.json();
  },

  getUserBookings: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/bookings?userId=${userId}`);
    return response.json();
  },

  // Statistics
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/stats`);
    return response.json();
  },
};

export default api;
