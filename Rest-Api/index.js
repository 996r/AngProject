// index.js

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./router/authRoutes');
const printerRoutes = require('./router/printerRoutes');
const branchRoutes = require('./router/branchRoutes');
const errorHandler = require('./utils/error_handler');
const config = require('./config/config');

// Connect to the database
connectDB();

const app = express();
const port = config.port;

// Middleware
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/printers', printerRoutes);
app.use('/api/branches', branchRoutes);

// Error handling middleware (should be the last middleware)
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Running in ${process.env.NODE_ENV || 'development'} mode.`);
});
