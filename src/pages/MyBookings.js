import React, { useState, useEffect } from 'react';
import api from '../services/api';

const MyBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [user.id]);

  const fetchBookings = async () => {
    try {
      const response = await api.getUserBookings(user.id);
      if (response.success) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading bookings...</div></div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="container">
        <h1>My Bookings</h1>
        <div className="error">No bookings found. Start booking now!</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>🎫 My Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Movie ID</th>
            <th>Show ID</th>
            <th>Seats</th>
            <th>Total Price</th>
            <th>Payment Mode</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.id.substring(0, 8)}...</td>
              <td>{booking.movieId}</td>
              <td>{booking.showId}</td>
              <td>{booking.bookedSeats && Array.isArray(booking.bookedSeats) ? booking.bookedSeats.join(', ') : 'N/A'}</td>
              <td>₹{booking.totalPrice}</td>
              <td>{booking.paymentMode}</td>
              <td>
                <span style={{
                  background: booking.status === 'CONFIRMED' ? '#d4edda' : '#f8d7da',
                  color: booking.status === 'CONFIRMED' ? '#155724' : '#721c24',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}>
                  {booking.status}
                </span>
              </td>
              <td>{new Date(booking.bookingTime).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
