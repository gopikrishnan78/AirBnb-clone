import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProperties } from '../services/propertyService';
import PropertyList from '../components/property/PropertyList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { AMENITIES } from '../utils/constants';
import './PropertySearch.css';

const PropertySearch = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    minPrice: '',
    maxPrice: '',
    amenities: []
  });

  const fetchProperties = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await getProperties(filters);
      setProperties(data.properties);
    } catch (err) {
      setError(err.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleAmenityToggle = (amenity) => {
    setFilters({
      ...filters,
      amenities: filters.amenities.includes(amenity)
        ? filters.amenities.filter(a => a !== amenity)
        : [...filters.amenities, amenity]
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <div className="property-search-page">
      <div className="search-container">
        <aside className="filters-sidebar">
          <h3>Filters</h3>
          
          <form onSubmit={handleSearch}>
            <Input
              label="Location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Enter location"
            />
            
            <Input
              label="Min Price"
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="$0"
            />
            
            <Input
              label="Max Price"
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Any"
            />
            
            <div className="amenities-filter">
              <label className="filter-label">Amenities</label>
              {AMENITIES.map((amenity) => (
                <label key={amenity} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>
            
            <Button type="submit" fullWidth>Apply Filters</Button>
          </form>
        </aside>

        <main className="search-results">
          <h2>
            {properties.length} {properties.length === 1 ? 'Property' : 'Properties'} Found
          </h2>
          
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} onRetry={fetchProperties} />}
          {!loading && !error && <PropertyList properties={properties} />}
        </main>
      </div>
    </div>
  );
};

export default PropertySearch;
