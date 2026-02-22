const validateEnv = () => {
  const requiredEnvVars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('Error: Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`  - ${varName}`);
    });
    console.error('\nPlease check your .env file and ensure all required variables are set.');
    throw new Error('Missing required environment variables');
  }

  console.log('Environment configuration validated successfully');
};

module.exports = validateEnv;
