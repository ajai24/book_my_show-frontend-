const API_BASE_URL = 'https://book-my-show-backend-vz6x.onrender.com/api';

const api = {
  // User Authentication
  registerUser: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }
      return response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  loginUser: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      return response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Admin Authentication
  registerAdmin: async (adminData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Admin registration failed');
      }
      return response.json();
    } catch (error) {
      console.error('Admin registration error:', error);
      throw error;
    }
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
