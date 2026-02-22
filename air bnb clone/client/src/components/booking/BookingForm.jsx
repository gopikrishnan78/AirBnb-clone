import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createBooking, checkAvailability } from '../../services/bookingService';
import { calculateNights, formatDateForInput } from '../../utils/dateHelpers';
import Input from '../common/Input';
import Button from '../common/Button';
import './BookingForm.css';

const BookingForm = ({ property }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const today = formatDateForInput(new Date());
  const tomorrow = formatDateForInput(new Date(Date.now() + 86400000));

  const [formData, setFormData] = useState({
    checkIn: today,
    checkOut: tomorrow
  });
  const [available, setAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const nights = calculateNights(formData.checkIn, formData.checkOut);
  const totalPrice = nights * property.price;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setAvailable(null);
    setError('');
  };

  const handleCheckAvailability = async () => {
    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      setError('Check-out date must be after check-in date');
      return;
    }

    if (new Date(formData.checkIn) < new Date()) {
      setError('Check-in date cannot be in the past');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await checkAvailability(property._id, formData.checkIn, formData.checkOut);
      setAvailable(data.available);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      setError('Check-out date must be after check-in date');
      return;
    }

    if (new Date(formData.checkIn) < new Date()) {
      setError('Check-in date cannot be in the past');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createBooking(property._id, formData.checkIn, formData.checkOut);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <div className="booking-price">
        <span className="price-amount">${property.price}</span> / night
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <Input
          label="Check-in"
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          required
        />

        <Input
          label="Check-out"
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          required
        />

        <div className="booking-summary">
          <div className="summary-row">
            <span>{nights} {nights === 1 ? 'night' : 'nights'}</span>
            <span>${totalPrice}</span>
          </div>
          <div className="summary-total">
            <strong>Total</strong>
            <strong>${totalPrice}</strong>
          </div>
        </div>

        {error && <div className="booking-error">{error}</div>}
        {success && <div className="booking-success">Booking successful! Redirecting...</div>}
        {available === true && <div className="booking-success">Property is available!</div>}
        {available === false && <div className="booking-error">Property is not available for these dates</div>}

        <div className="booking-actions">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCheckAvailability}
            disabled={loading}
            fullWidth
          >
            Check Availability
          </Button>
          <Button
            type="submit"
            disabled={loading || available === false}
            fullWidth
          >
            {loading ? 'Processing...' : 'Book Now'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
