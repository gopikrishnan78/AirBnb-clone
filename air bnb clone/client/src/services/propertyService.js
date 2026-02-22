import api from './api';

export const getProperties = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.location) params.append('location', filters.location);
  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
  if (filters.amenities && filters.amenities.length > 0) {
    filters.amenities.forEach(amenity => params.append('amenities', amenity));
  }
  
  const response = await api.get(`/properties?${params.toString()}`);
  return response.data;
};

export const getPropertyById = async (id) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

export const createProperty = async (propertyData) => {
  const response = await api.post('/properties', propertyData);
  return response.data;
};

export const updateProperty = async (id, propertyData) => {
  const response = await api.put(`/properties/${id}`, propertyData);
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
};

export const getUserProperties = async () => {
  const response = await api.get('/properties/user/my-properties');
  return response.data;
};
