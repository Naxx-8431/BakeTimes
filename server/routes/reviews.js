const express = require('express');
const router = express.Router();
const {
    getAllReviews,
    getFeaturedReviews,
    createReview,
    updateReview,
    toggleFeatured,
    deleteReview
} = require('../controllers/reviewController');

// ============================================
// REVIEW ROUTES
// ============================================

// @route   GET /api/reviews
// @desc    Get all reviews
// @access  Public (typically admin)
router.get('/', getAllReviews);

// @route   GET /api/reviews/featured
// @desc    Get featured reviews only (max 4)
// @access  Public
router.get('/featured', getFeaturedReviews);

// @route   POST /api/reviews
// @desc    Submit new review
// @access  Public
// Example: POST /api/reviews
// Body: { "name": "John Doe", "email": "john@example.com", "rating": 5, "review": "Great website!" }
router.post('/', createReview);

// @route   PUT /api/reviews/:id
// @desc    Update review (approve/reject, feature/unfeature)
// @access  Admin
// Example: PUT /api/reviews/123abc
// Body: { "isApproved": true, "isFeatured": false }
router.put('/:id', updateReview);

// @route   PUT /api/reviews/:id/toggle-featured
// @desc    Toggle featured status (max 4 featured)
// @access  Admin
// Example: PUT /api/reviews/123abc/toggle-featured
router.put('/:id/toggle-featured', toggleFeatured);

// @route   DELETE /api/reviews/:id
// @desc    Delete review
// @access  Admin
// Example: DELETE /api/reviews/123abc
router.delete('/:id', deleteReview);

module.exports = router;
