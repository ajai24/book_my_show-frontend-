import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Movies from './pages/Movies';
import Theatres from './pages/Theatres';
import ShowDetail from './pages/ShowDetail';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    const savedAdmin = localStorage.getItem('admin');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedAdmin) setAdmin(JSON.parse(savedAdmin));
  }, []);

  const handleUserLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleUserLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleAdminLogin = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem('admin', JSON.stringify(adminData));
  };

  const handleAdminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  return (
    <Router>
      <Navbar user={user} admin={admin} onUserLogout={handleUserLogout} onAdminLogout={handleAdminLogout} />
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={user ? <Navigate to="/movies" /> : <Register onLogin={handleUserLogin} />} />
          <Route path="/login" element={user ? <Navigate to="/movies" /> : <Login onLogin={handleUserLogin} />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/theatres" element={<Theatres />} />
          <Route path="/show/:showId" element={user ? <ShowDetail user={user} /> : <Navigate to="/login" />} />
          <Route path="/booking/:showId" element={user ? <Booking user={user} /> : <Navigate to="/login" />} />
          <Route path="/my-bookings" element={user ? <MyBookings user={user} /> : <Navigate to="/login" />} />

          {/* Admin Routes */}
          <Route path="/admin-login" element={admin ? <Navigate to="/admin-panel" /> : <AdminLogin onLogin={handleAdminLogin} />} />
          <Route path="/admin-panel" element={admin ? <AdminPanel admin={admin} /> : <Navigate to="/admin-login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
