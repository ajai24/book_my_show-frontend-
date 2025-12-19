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
      <h1>🔐 Admin Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && <div className={message.includes('✓') ? 'success' : 'error'}>{message}</div>}
    </div>
  );
};

export default AdminLogin;
