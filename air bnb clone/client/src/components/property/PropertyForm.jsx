import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImages } from '../../services/uploadService';
import Input from '../common/Input';
import Button from '../common/Button';
import { AMENITIES } from '../../utils/constants';
import './PropertyForm.css';

const PropertyForm = ({ initialData, onSubmit, isEdit = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    amenities: [],
    images: []
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAmenityToggle = (amenity) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenity)
        ? formData.amenities.filter(a => a !== amenity)
        : [...formData.amenities, amenity]
    });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUploadImages = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select images to upload');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const data = await uploadImages(selectedFiles);
      setFormData({
        ...formData,
        images: [...formData.images, ...data.urls]
      });
      setSelectedFiles([]);
      document.getElementById('image-input').value = '';
    } catch (err) {
      setError(err.message || 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.location || !formData.price) {
      setError('Please fill in all required fields');
      return;
    }

    if (Number(formData.price) <= 0) {
      setError('Price must be a positive number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to save property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="property-form">
      <h2>{isEdit ? 'Edit Property' : 'Create New Property'}</h2>

      {error && <div className="form-error">{error}</div>}

      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Beautiful apartment in downtown"
      />

      <div className="input-group">
        <label className="input-label">
          Description <span className="required">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="textarea-field"
          rows="5"
          placeholder="Describe your property..."
        />
      </div>

      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
        placeholder="New York, NY"
      />

      <Input
        label="Price per night"
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
        placeholder="100"
      />

      <div className="amenities-section">
        <label className="input-label">Amenities</label>
        <div className="amenities-grid">
          {AMENITIES.map((amenity) => (
            <label key={amenity} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      <div className="images-section">
        <label className="input-label">Images</label>
        <input
          id="image-input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="file-input"
        />
        <Button
          type="button"
          variant="secondary"
          onClick={handleUploadImages}
          disabled={uploading || selectedFiles.length === 0}
        >
          {uploading ? 'Uploading...' : 'Upload Images'}
        </Button>

        {formData.images.length > 0 && (
          <div className="images-preview">
            {formData.images.map((url, index) => (
              <div key={index} className="image-preview-item">
                <img src={url} alt={`Property ${index + 1}`} />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="remove-image-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={() => navigate('/dashboard')}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : isEdit ? 'Update Property' : 'Create Property'}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
