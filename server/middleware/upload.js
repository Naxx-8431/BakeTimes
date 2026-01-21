// ============================================
// FILE UPLOAD MIDDLEWARE (MULTER CONFIGURATION)
// ============================================
// This file configures Multer for handling recipe image uploads

const multer = require('multer');
const path = require('path');

// ============================================
// STORAGE CONFIGURATION
// ============================================
/**
 * Configure where and how uploaded files are stored
 */
const storage = multer.diskStorage({

    // Set destination folder for uploaded files
    destination: function (req, file, cb) {
        // Store images in the 'uploads/recipes' folder
        // This folder should exist or be created
        cb(null, 'uploads/recipes/');
    },

    // Generate unique filename for each upload
    filename: function (req, file, cb) {
        // Create unique filename: recipe-{timestamp}-{random}.{extension}
        // Example: recipe-1642345678901-abc123.jpg
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);  // Get file extension (.jpg, .png, etc.)
        const fileName = 'recipe-' + uniqueSuffix + fileExtension;

        cb(null, fileName);
    }
});

// ============================================
// FILE FILTER (VALIDATION)
// ============================================
/**
 * Filter uploaded files - only accept image files
 * @param {Object} req - Express request object
 * @param {Object} file - Uploaded file object
 * @param {Function} cb - Callback function
 */
const fileFilter = (req, file, cb) => {
    // Define allowed image MIME types
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    // Check if uploaded file is an image
    if (allowedMimeTypes.includes(file.mimetype)) {
        // Accept the file
        cb(null, true);
    } else {
        // Reject the file with error message
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'), false);
    }
};

// ============================================
// MULTER CONFIGURATION
// ============================================
/**
 * Create Multer instance with all configurations
 */
const upload = multer({
    storage: storage,           // Use our custom storage configuration
    fileFilter: fileFilter,     // Use our file type filter
    limits: {
        fileSize: 5 * 1024 * 1024  // Limit file size to 5MB (5 * 1024 * 1024 bytes)
    }
});

// ============================================
// EXPORT MIDDLEWARE
// ============================================
// Export the configured upload middleware
// Usage in routes: upload.single('image') for single file
//                  upload.array('images', 5) for multiple files
module.exports = upload;
