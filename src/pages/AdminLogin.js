import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await api.loginAdmin(formData.email, formData.password);
      if (response.success) {
        setMessage('✓ Admin login successful!');
        onLogin(response.data);
        setTimeout(() => navigate('/admin-panel'), 1000);
      } else {
        setMessage('✗ ' + (response.message || 'Login failed'));
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
        <h1>Admin Login</h1>
        <p>Sign in to manage theatres, movies, and shows</p>
      </div>

      <div className="form-container">
        <div className="admin-login-title">Welcome back</div>
        <div className="admin-login-subtitle">Use your admin credentials to continue</div>


        {message && (
          <div className={`message ${message.includes('✓') ? 'success-message' : 'error-message'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
