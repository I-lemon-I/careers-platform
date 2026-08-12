//Importing required modules/libraries
const express = require('express'); //Express - a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It simplifies the process of building server-side applications and APIs.
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

//const jobsRoutes = require('./api/routes/jobs'); //Import routes

const app = express(); // Create an instance of Express
const PORT = process.env.PORT || 3000; // Set the port from environment variable or default to 3000

const jobsRoutes = require('./api/routes/jobs');
const authRoutes = require('./api/routes/auth');

// Middleware setup - functions that will be executed for every incoming request
app.use(helmet()); // Security middleware to set various HTTP headers. Protects against some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes. This allows for API to be accessed from different domains.
app.use(express.json()); // Parse incoming requests with JSON payloads. This middleware is available in Express 4.16.0 and later.
app.use(morgan('dev')); // HTTP request logger middleware for node.js. It will log details of incoming requests to the console in 'dev' format, which provides concise output colored by response status for development use.
app.use('/api/auth', authRoutes);

//When someone wants to visit the .../health path of the app,
//Express will send a JSON response (res) with some data such as status, timestamp or environment
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(), //Date() is converted to ISO string format for consistency and readability (ISO - International Organization for Standardization)
        environment: process.env.NODE_ENV || 'development' //process - global object in Node.js, gives information about the current process
                                                           //process.env - object that contains all environment tables
                                                           //process.env.NODE_ENV - environment variable that indicates the environment in which the application is running (e.g., development, production, etc.)
    });
});

app.use('/api/jobs', jobsRoutes); //app.use() - runs specific function for every request that matches indicated path

//Error 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

//Global error handler - catches any errors that occur in the application and sends a JSON response with the error message
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status ||500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && {stack: err.stack})
    });
});

//Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`API base: http://localhost:${PORT}/api/jobs`);
});

module.exports = app; //Export the app for testing or further usage in other modules
