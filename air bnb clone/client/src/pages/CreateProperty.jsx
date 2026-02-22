import React from 'react';
import { createProperty } from '../services/propertyService';
import PropertyForm from '../components/property/PropertyForm';
import './PropertyFormPages.css';

const CreateProperty = () => {
  const handleSubmit = async (formData) => {
    await createProperty(formData);
  };

  return (
    <div className="property-form-page">
      <PropertyForm onSubmit={handleSubmit} isEdit={false} />
    </div>
  );
};

export default CreateProperty;
