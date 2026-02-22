import React, { useState, useEffect } from 'react';
import { getUserProperties } from '../services/propertyService';
import { getUserBookings } from '../services/bookingService';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { formatDate } from '../utils/dateHelpers';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [propertiesData, bookingsData] = await Promise.all([
        getUserProperties(),
        getUserBookings()
      ]);
      setProperties(propertiesData.properties);
      setBookings(bookingsData.bookings);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const { deleteProperty } = await import('../services/propertyService');
        await deleteProperty(id);
        setProperties(properties.filter(p => p._id !== id));
      } catch (error) {
        alert('Failed to delete property');
      }
    }
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const { cancelBooking } = await import('../services/bookingService');
        await cancelBooking(id);
        fetchData();
      } catch (error) {
        alert('Failed to cancel booking');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1>Dashboard</h1>

        <div className="dashboard-tabs">
          <button
            className={`tab ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            My Properties ({properties.length})
          </button>
          <button
            className={`tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            My Bookings ({bookings.length})
          </button>
        </div>

        {activeTab === 'properties' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>My Properties</h2>
              <Button onClick={() => navigate('/create-property')}>
                Add New Property
              </Button>
            </div>

            {properties.length === 0 ? (
              <p className="empty-message">You haven't listed any properties yet.</p>
            ) : (
              <div className="items-grid">
                {properties.map((property) => (
                  <div key={property._id} className="dashboard-card">
                    <img
                      src={property.images[0] || 'https://via.placeholder.com/300x200'}
                      alt={property.title}
                      className="card-image"
                    />
                    <div className="card-body">
                      <h3>{property.title}</h3>
                      <p className="card-location">{property.location}</p>
                      <p className="card-price">${property.price} / night</p>
                      <div className="card-actions">
                        <Button
                          variant="secondary"
                          onClick={() => navigate(`/edit-property/${property._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteProperty(property._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="tab-content">
            <h2>My Bookings</h2>

            {bookings.length === 0 ? (
              <p className="empty-message">You haven't made any bookings yet.</p>
            ) : (
              <div className="bookings-list">
                {bookings.map((booking) => (
                  <div key={booking._id} className="booking-card">
                    <img
                      src={booking.property?.images?.[0] || 'https://via.placeholder.com/200x150'}
                      alt={booking.property?.title}
                      className="booking-image"
                    />
                    <div className="booking-details">
                      <h3>{booking.property?.title}</h3>
                      <p>{booking.property?.location}</p>
                      <p className="booking-dates">
                        {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                      </p>
                      <p className="booking-price">Total: ${booking.totalPrice}</p>
                      <span className={`booking-status status-${booking.status}`}>
                        {booking.status}
                      </span>
                    </div>
                    {booking.status === 'active' && (
                      <Button
                        variant="danger"
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
