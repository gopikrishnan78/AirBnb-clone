import React from 'react';
import Card from '../common/Card';
import './PropertyList.css';

const PropertyList = ({ properties }) => {
  if (!properties || properties.length === 0) {
    return (
      <div className="no-properties">
        <p>No properties found. Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="property-list">
      {properties.map((property) => (
        <Card key={property._id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
