import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim()) {
      navigate(`/properties?location=${encodeURIComponent(location)}`);
    } else {
      navigate('/properties');
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">Find your next stay</h1>
        <p className="hero-subtitle">
          Search deals on hotels, homes, and much more...
        </p>
        
        <form onSubmit={handleSearch} className="search-form">
          <Input
            type="text"
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="features-section">
        <h2>Why choose us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏠</div>
            <h3>Wide Selection</h3>
            <p>Browse thousands of properties worldwide</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Find the best deals for your budget</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Trusted Reviews</h3>
            <p>Read reviews from verified guests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
