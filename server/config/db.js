// ============================================
// DATABASE CONNECTION CONFIGURATION
// ============================================
// This file handles the connection to MongoDB using Mongoose

const mongoose = require('mongoose');

/**
 * connectDB - Establishes connection to MongoDB database
 * 
 * Uses Mongoose to connect to MongoDB with the URI from environment variables
 * Handles connection success and error cases
 */
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from .env file
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // These options ensure compatibility and proper connection handling
            useNewUrlParser: true,      // Use new URL parser instead of deprecated one
            useUnifiedTopology: true,   // Use new Server Discovery and Monitoring engine
        });

        // Log successful connection with host information
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database Name: ${conn.connection.name}`);

    } catch (error) {
        // Log error details if connection fails
        console.error(`❌ MongoDB Connection Error: ${error.message}`);

        // Exit process with failure code (1) if database connection fails
        // This prevents the server from running without a database
        process.exit(1);
    }
};

// Export the function so it can be used in server.js
module.exports = connectDB;
