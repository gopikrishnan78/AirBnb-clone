require('dotenv').config();
const app = require('./app');
const connectDatabase = require('./config/database');
const validateEnv = require('./config/env');

validateEnv();

connectDatabase();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(() => process.exit(1));
});
