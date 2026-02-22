import api from './api';

export const createBooking = async (propertyId, checkIn, checkOut) => {
  const response = await api.post('/bookings', { propertyId, checkIn, checkOut });
  return response.data;
};

export const getUserBookings = async () => {
  const response = await api.get('/bookings/user');
  return response.data;
};

export const getPropertyBookings = async (propertyId) => {
  const response = await api.get(`/bookings/property/${propertyId}`);
  return response.data;
};

export const checkAvailability = async (propertyId, checkIn, checkOut) => {
  const response = await api.post('/bookings/check-availability', {
    propertyId,
    checkIn,
    checkOut
  });
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await api.put(`/bookings/${id}/cancel`);
  return response.data;
};
