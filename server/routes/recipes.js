// ============================================
// RECIPE ROUTES (API ENDPOINTS)
// ============================================
// This file defines all the API endpoints for recipe operations

const express = require('express');
const router = express.Router();

// Import controller functions
const {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    addRating,
    getStats
} = require('../controllers/recipeController');

// Import upload middleware
const upload = require('../middleware/upload');

// ============================================
// RECIPE ROUTES
// ============================================

/**
 * @route   GET /api/recipes/stats
 * @desc    Get recipe statistics
 * @access  Public
 * 
 * NOTE: This route must come BEFORE /api/recipes/:id
 * Otherwise Express will treat 'stats' as an ID parameter
 */
router.get('/stats', getStats);

/**
 * @route   GET /api/recipes
 * @desc    Get all recipes with optional filtering
 * @access  Public
 * 
 * Query Parameters:
 * - category: Filter by category (e.g., ?category=dessert)
 * - difficulty: Filter by difficulty (e.g., ?difficulty=easy)
 * - search: Search in title and description (e.g., ?search=chocolate)
 * - sortBy: Sort results (rating, title, prepTime, createdAt)
 * - limit: Limit number of results (e.g., ?limit=10)
 * 
 * Example: GET /api/recipes?category=dessert&sortBy=rating&limit=5
 */
router.get('/', getAllRecipes);

/**
 * @route   GET /api/recipes/:id
 * @desc    Get a single recipe by ID
 * @access  Public
 * 
 * Example: GET /api/recipes/507f1f77bcf86cd799439011
 */
router.get('/:id', getRecipeById);

/**
 * @route   POST /api/recipes
 * @desc    Create a new recipe
 * @access  Public (should be protected with authentication in production)
 * 
 * Body (multipart/form-data):
 * - title: Recipe title (required)
 * - description: Recipe description (required)
 * - ingredients: JSON array of ingredients (required)
 * - instructions: Cooking instructions (required)
 * - prepTime: Preparation time in minutes (required)
 * - cookTime: Cooking time in minutes (required)
 * - servings: Number of servings (required)
 * - difficulty: easy/medium/hard (required)
 * - category: Recipe category (required)
 * - author: Recipe author (optional)
 * - tags: JSON array of tags (optional)
 * - image: Recipe image file (optional)
 * 
 * upload.single('image') - Multer middleware for handling single image upload
 * The field name in the form must be 'image'
 */
router.post('/', upload.single('image'), createRecipe);

/**
 * @route   PUT /api/recipes/:id
 * @desc    Update an existing recipe
 * @access  Public (should be protected with authentication in production)
 * 
 * Body: Same as POST /api/recipes (all fields optional)
 * 
 * Example: PUT /api/recipes/507f1f77bcf86cd799439011
 */
router.put('/:id', upload.single('image'), updateRecipe);

/**
 * @route   DELETE /api/recipes/:id
 * @desc    Delete a recipe
 * @access  Public (should be protected with authentication in production)
 * 
 * Example: DELETE /api/recipes/507f1f77bcf86cd799439011
 */
router.delete('/:id', deleteRecipe);

/**
 * @route   POST /api/recipes/:id/rating
 * @desc    Add a rating to a recipe
 * @access  Public
 * 
 * Body (JSON):
 * {
 *   "rating": 4.5  // Number between 1 and 5
 * }
 * 
 * Example: POST /api/recipes/507f1f77bcf86cd799439011/rating
 */
router.post('/:id/rating', addRating);

// ============================================
// EXPORT ROUTER
// ============================================
// Export the router to be used in server.js
module.exports = router;
