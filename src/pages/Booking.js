import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Booking = ({ user }) => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentMode, setPaymentMode] = useState('CREDIT_CARD');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const totalSeats = 100;
  const pricePerSeat = 250;

  const toggleSeat = (seatNum) => {
    setSelectedSeats(prev =>
      prev.includes(seatNum)
        ? prev.filter(s => s !== seatNum)
        : [...prev, seatNum]
    );
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      setMessage('Please select at least one seat');
      return;
    }

    setLoading(true);

    try {
      const response = await api.bookSeats({
        userId: user.id,
        showId: showId,
        seats: selectedSeats,
        paymentMode: paymentMode,
      });

      if (response.success) {
        setMessage('✅ Booking successful!');
        setTimeout(() => {
          navigate('/my-bookings');
        }, 2000);
      } else {
        setMessage(`Error: ${response.error}`);
      }
    } catch (error) {
      setMessage('Booking failed. Try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = selectedSeats.length * pricePerSeat;

  return (
    <div className="container">
      <h1>🎫 Book Your Seats</h1>

      {message && (
        <div className={`message ${message.includes('✅') || message.includes('successful') ? 'success-message' : 'error-message'}`}>
          {message}
        </div>
      )}

      <div style={{ marginBottom: '30px' }}>
        <h3>Screen</h3>
        <div style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>🎬</div>

        <div className="seats-grid">
          {Array.from({ length: totalSeats }, (_, i) => i + 1).map(seatNum => (
            <div
              key={seatNum}
              className={`seat ${selectedSeats.includes(seatNum) ? 'selected' : ''}`}
              onClick={() => toggleSeat(seatNum)}
              title={`Seat ${seatNum}`}
            >
              {seatNum}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</h3>
        <p><strong>Price per seat:</strong> ₹{pricePerSeat}</p>
        <p><strong>Total seats:</strong> {selectedSeats.length}</p>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#667eea' }}>
          <strong>Total Amount: ₹{totalPrice}</strong>
        </p>
      </div>

      <div className="form-group">
        <label>Payment Mode *</label>
        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
        >
          <option value="CREDIT_CARD">Credit Card</option>
          <option value="DEBIT_CARD">Debit Card</option>
          <option value="WALLET">Digital Wallet</option>
          <option value="NET_BANKING">Net Banking</option>
        </select>
      </div>

      <button
        className="btn"
        onClick={handleBooking}
        disabled={loading || selectedSeats.length === 0}
      >
        {loading ? 'Processing...' : `Confirm Booking (₹${totalPrice})`}
      </button>
    </div>
  );
};

export default Booking;
