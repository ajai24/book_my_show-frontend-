import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, admin, onUserLogout, onAdminLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user) {
      onUserLogout();
    } else if (admin) {
      onAdminLogout();
    }
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h1>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          🎬 BookMyShow
        </Link>
      </h1>
      <div className="navbar-links">
        {!user && !admin ? (
          <>
            <Link to="/movies">Movies</Link>
            <Link to="/theatres">Theatres</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/admin-login">Admin</Link>
          </>
        ) : user ? (
          <>
            <Link to="/movies">Movies</Link>
            <Link to="/theatres">Theatres</Link>
            <Link to="/my-bookings">My Bookings</Link>
            <span>👤 {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <span>🔐 Admin: {admin.name}</span>
            <Link to="/admin-panel">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
