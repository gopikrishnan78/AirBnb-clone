const validateEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 8;
};

const validateFutureDate = (date) => {
  return new Date(date) >= new Date();
};

const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start < end;
};

const validatePrice = (price) => {
  return !isNaN(price) && Number(price) > 0;
};

const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateFutureDate,
  validateDateRange,
  validatePrice,
  sanitizeString
};
