const mongoose = require('mongoose');

// ============================================
// REVIEW SCHEMA
// ============================================
const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5']
    },
    review: {
        type: String,
        required: [true, 'Review text is required'],
        trim: true,
        minlength: [10, 'Review must be at least 10 characters'],
        maxlength: [500, 'Review cannot exceed 500 characters']
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// ============================================
// INDEXES
// ============================================
reviewSchema.index({ isFeatured: 1, isApproved: 1 });
reviewSchema.index({ createdAt: -1 });

// ============================================
// VIRTUAL PROPERTIES
// ============================================
// Format date for display
reviewSchema.virtual('formattedDate').get(function () {
    return this.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// ============================================
// INSTANCE METHODS
// ============================================
// Toggle featured status
reviewSchema.methods.toggleFeatured = async function () {
    this.isFeatured = !this.isFeatured;
    return await this.save();
};

// Approve review
reviewSchema.methods.approve = async function () {
    this.isApproved = true;
    return await this.save();
};

// Reject review
reviewSchema.methods.reject = async function () {
    this.isApproved = false;
    this.isFeatured = false; // Can't be featured if not approved
    return await this.save();
};

// ============================================
// STATIC METHODS
// ============================================
// Get featured reviews (max 4)
reviewSchema.statics.getFeatured = function () {
    return this.find({ isFeatured: true, isApproved: true })
        .sort({ createdAt: -1 })
        .limit(4);
};

// Count featured reviews
reviewSchema.statics.countFeatured = function () {
    return this.countDocuments({ isFeatured: true, isApproved: true });
};

// ============================================
// MIDDLEWARE
// ============================================
// Before saving, ensure only approved reviews can be featured
reviewSchema.pre('save', function (next) {
    if (this.isFeatured && !this.isApproved) {
        this.isFeatured = false;
    }
    next();
});

// Export model
module.exports = mongoose.model('Review', reviewSchema);
