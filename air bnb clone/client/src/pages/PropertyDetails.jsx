import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '../services/propertyService';
import ImageGallery from '../components/common/ImageGallery';
import BookingForm from '../components/booking/BookingForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProperty = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getPropertyById(id);
      setProperty(data.property);
    } catch (err) {
      setError(err.message || 'Failed to load property');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProperty} />;
  if (!property) return <ErrorMessage message="Property not found" />;

  return (
    <div className="property-details-page">
      <div className="property-container">
        <h1 className="property-title">{property.title}</h1>
        <p className="property-location">📍 {property.location}</p>

        <ImageGallery images={property.images} />

        <div className="property-content">
          <div className="property-info">
            <div className="property-section">
              <h2>About this property</h2>
              <p className="property-description">{property.description}</p>
            </div>

            <div className="property-section">
              <h2>Amenities</h2>
              {property.amenities && property.amenities.length > 0 ? (
                <ul className="amenities-list">
                  {property.amenities.map((amenity, index) => (
                    <li key={index}>✓ {amenity}</li>
                  ))}
                </ul>
              ) : (
                <p>No amenities listed</p>
              )}
            </div>

            <div className="property-section">
              <h2>Hosted by</h2>
              <p className="host-name">{property.owner?.name || 'Host'}</p>
            </div>
          </div>

          <div className="booking-sidebar">
            <BookingForm property={property} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
