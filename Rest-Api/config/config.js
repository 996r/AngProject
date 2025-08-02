// config/config.js

const dotenv = require('dotenv');

dotenv.config();

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 3000,
    dbURI: process.env.MONGO_URI || 'mongodb://localhost:27017/print-management',
    jwtSecret: process.env.JWT_SECRET || 'your_very_secure_secret_key',
  },
  production: {
    port: process.env.PORT || 3000,
    dbURI: process.env.MONGO_URI, 
    jwtSecret: process.env.JWT_SECRET,
  },
};

module.exports = config[env];
