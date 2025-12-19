import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!formData.email || !formData.password) {
      setMessage('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await api.loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        setMessage('Login successful!');
        onLogin(response.data);
        setTimeout(() => navigate('/movies'), 1500);
      } else {
        setMessage(`Error: ${response.error}`);
      }
    } catch (error) {
      setMessage('Login failed. Try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>User Login</h2>
        {message && (
          <div className={`message ${message.includes('successful') ? 'success-message' : 'error-message'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Don't have account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
