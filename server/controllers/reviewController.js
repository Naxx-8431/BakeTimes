const Review = require('../models/Review');

// ============================================
// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public (but typically used by admin)
// ============================================
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching reviews',
            error: error.message
        });
    }
};

// ============================================
// @desc    Get featured reviews only (max 4)
// @route   GET /api/reviews/featured
// @access  Public
// ============================================
exports.getFeaturedReviews = async (req, res) => {
    try {
        const reviews = await Review.getFeatured();

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        console.error('Error fetching featured reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching featured reviews',
            error: error.message
        });
    }
};

// ============================================
// @desc    Create new review
// @route   POST /api/reviews
// @access  Public
// ============================================
exports.createReview = async (req, res) => {
    try {
        const { name, email, rating, review } = req.body;

        // Validate required fields
        if (!name || !email || !rating || !review) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: name, email, rating, review'
            });
        }

        // Create review
        const newReview = await Review.create({
            name,
            email,
            rating,
            review,
            isApproved: false, // Needs admin approval
            isFeatured: false
        });

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully! It will appear after admin approval.',
            data: newReview
        });
    } catch (error) {
        console.error('Error creating review:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating review',
            error: error.message
        });
    }
};

// ============================================
// @desc    Update review (approve/reject)
// @route   PUT /api/reviews/:id
// @access  Admin
// ============================================
exports.updateReview = async (req, res) => {
    try {
        const { isApproved, isFeatured } = req.body;

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Update fields if provided
        if (typeof isApproved !== 'undefined') {
            review.isApproved = isApproved;
        }

        if (typeof isFeatured !== 'undefined') {
            review.isFeatured = isFeatured;
        }

        await review.save();

        res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            data: review
        });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating review',
            error: error.message
        });
    }
};

// ============================================
// @desc    Toggle featured status
// @route   PUT /api/reviews/:id/toggle-featured
// @access  Admin
// ============================================
exports.toggleFeatured = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Check if review is approved
        if (!review.isApproved && !review.isFeatured) {
            return res.status(400).json({
                success: false,
                message: 'Only approved reviews can be featured'
            });
        }

        // If trying to feature, check if we already have 4 featured
        if (!review.isFeatured) {
            const featuredCount = await Review.countFeatured();
            if (featuredCount >= 4) {
                return res.status(400).json({
                    success: false,
                    message: 'Maximum 4 reviews can be featured. Please unfeature another review first.'
                });
            }
        }

        // Toggle featured status
        await review.toggleFeatured();

        res.status(200).json({
            success: true,
            message: `Review ${review.isFeatured ? 'featured' : 'unfeatured'} successfully`,
            data: review
        });
    } catch (error) {
        console.error('Error toggling featured status:', error);
        res.status(500).json({
            success: false,
            message: 'Error toggling featured status',
            error: error.message
        });
    }
};

// ============================================
// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Admin
// ============================================
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        await Review.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting review',
            error: error.message
        });
    }
};
