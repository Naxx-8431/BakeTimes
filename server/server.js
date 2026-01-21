// ============================================
// MAIN SERVER FILE
// ============================================
// This is the entry point of the backend application

// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import database connection function
const connectDB = require('./config/db');

// Import routes
const recipeRoutes = require('./routes/recipes');

// ============================================
// INITIALIZE EXPRESS APP
// ============================================
const app = express();

// ============================================
// CONNECT TO DATABASE
// ============================================
// Connect to MongoDB before starting the server
connectDB();

// ============================================
// MIDDLEWARE SETUP
// ============================================

/**
 * CORS - Enable Cross-Origin Resource Sharing
 * Allows frontend (running on different port) to communicate with backend
 */
app.use(cors({
    origin: '*',  // Allow all origins (in production, specify exact frontend URL)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

/**
 * Body Parser Middleware
 * Parse incoming JSON requests and make data available in req.body
 */
app.use(express.json());

/**
 * URL-encoded Parser
 * Parse URL-encoded data (from HTML forms)
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Static Files Middleware
 * Serve uploaded images as static files
 * Images will be accessible at: http://localhost:5000/uploads/recipes/filename.jpg
 */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/**
 * Request Logger Middleware (for development)
 * Logs all incoming requests
 */
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// ============================================
// CREATE UPLOAD DIRECTORIES
// ============================================
// Ensure upload directories exist
const uploadDir = path.join(__dirname, 'uploads/recipes');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('📁 Created uploads directory');
}

// ============================================
// API ROUTES
// ============================================

/**
 * Health Check Route
 * Test if server is running
 */
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Recipe API Server is running! 🚀',
        version: '1.0.0',
        endpoints: {
            recipes: '/api/recipes',
            reviews: '/api/reviews',
            stats: '/api/recipes/stats',
            health: '/health'
        }
    });
});

/**
 * Health Check Endpoint
 * Used for monitoring server status
 */
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

/**
 * Recipe Routes
 * All recipe-related endpoints are prefixed with /api/recipes
 */
app.use('/api/recipes', recipeRoutes);

/**
 * Review Routes
 * All review-related endpoints are prefixed with /api/reviews
 */
const reviewRoutes = require('./routes/reviews');
app.use('/api/reviews', reviewRoutes);

/**
 * Subscriber Routes
 * Newsletter subscription endpoints
 */
const subscriberRoutes = require('./routes/subscribers');
app.use('/api/subscribers', subscriberRoutes);

/**
 * Question Routes
 * Q&A form endpoints
 */
const questionRoutes = require('./routes/questions');
app.use('/api/questions', questionRoutes);

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

/**
 * 404 Handler - Route Not Found
 * This runs if no route matches the request
 */
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        requestedUrl: req.originalUrl
    });
});

/**
 * Global Error Handler
 * Catches all errors from routes and middleware
 */
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);

    // Handle Multer errors (file upload errors)
    if (err.name === 'MulterError') {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size too large. Maximum size is 5MB.'
            });
        }
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    // Handle other errors
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('');
    console.log('═══════════════════════════════════════════════');
    console.log('🚀 SERVER STARTED SUCCESSFULLY');
    console.log('═══════════════════════════════════════════════');
    console.log(`📡 Server running on: http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🖼️  Uploads URL: http://localhost:${PORT}/uploads`);
    console.log('═══════════════════════════════════════════════');
    console.log('');
    console.log('Available Endpoints:');
    console.log(`  GET    http://localhost:${PORT}/api/recipes`);
    console.log(`  GET    http://localhost:${PORT}/api/recipes/:id`);
    console.log(`  POST   http://localhost:${PORT}/api/recipes`);
    console.log(`  PUT    http://localhost:${PORT}/api/recipes/:id`);
    console.log(`  DELETE http://localhost:${PORT}/api/recipes/:id`);
    console.log(`  POST   http://localhost:${PORT}/api/recipes/:id/rating`);
    console.log(`  GET    http://localhost:${PORT}/api/recipes/stats`);
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('═══════════════════════════════════════════════');
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================
// Handle server shutdown gracefully
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('✅ HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n👋 SIGINT signal received: closing HTTP server');
    process.exit(0);
});
