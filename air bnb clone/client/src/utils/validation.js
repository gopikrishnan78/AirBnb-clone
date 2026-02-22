export const validateEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 8;
};

export const validatePrice = (price) => {
  return !isNaN(price) && Number(price) > 0;
};

export const validateDateRange = (checkIn, checkOut) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  return checkInDate < checkOutDate;
};

export const validateFutureDate = (date) => {
  return new Date(date) >= new Date();
};
