import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById, updateProperty } from '../services/propertyService';
import PropertyForm from '../components/property/PropertyForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './PropertyFormPages.css';

const EditProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data.property);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSubmit = async (formData) => {
    await updateProperty(id, formData);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="property-form-page">
      <PropertyForm initialData={property} onSubmit={handleSubmit} isEdit={true} />
    </div>
  );
};

export default EditProperty;
