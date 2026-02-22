import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({ property }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/properties/${property._id}`);
  };

  const imageUrl = property.images && property.images.length > 0 
    ? property.images[0] 
    : 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-image-container">
        <img src={imageUrl} alt={property.title} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{property.title}</h3>
        <p className="card-location">{property.location}</p>
        <p className="card-price">
          <span className="price-amount">${property.price}</span> / night
        </p>
      </div>
    </div>
  );
};

export default Card;
