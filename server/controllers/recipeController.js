// ============================================
// RECIPE CONTROLLER (BUSINESS LOGIC)
// ============================================
// This file contains all the logic for handling recipe-related requests

const Recipe = require('../models/Recipe');
const path = require('path');
const fs = require('fs');

// ============================================
// GET ALL RECIPES
// ============================================
/**
 * @route   GET /api/recipes
 * @desc    Get all recipes with optional filtering and sorting
 * @access  Public
 */
exports.getAllRecipes = async (req, res) => {
    try {
        // Extract query parameters for filtering and sorting
        const { category, difficulty, search, sortBy, limit } = req.query;

        // Build query object
        let query = {};

        // Filter by category if provided
        if (category) {
            query.category = category;
        }

        // Filter by difficulty if provided
        if (difficulty) {
            query.difficulty = difficulty;
        }

        // Search in title and description if search term provided
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },        // Case-insensitive search in title
                { description: { $regex: search, $options: 'i' } }   // Case-insensitive search in description
            ];
        }

        // Only show published recipes
        query.isPublished = true;

        // Build sort object (default: newest first)
        let sortOptions = { createdAt: -1 };  // -1 = descending order

        if (sortBy === 'rating') {
            sortOptions = { rating: -1, reviewCount: -1 };
        } else if (sortBy === 'title') {
            sortOptions = { title: 1 };  // 1 = ascending order (A-Z)
        } else if (sortBy === 'prepTime') {
            sortOptions = { prepTime: 1 };
        }

        // Execute query with limit (default: all recipes)
        const recipes = await Recipe.find(query)
            .sort(sortOptions)
            .limit(limit ? parseInt(limit) : 0);  // 0 = no limit

        // Send successful response
        res.status(200).json({
            success: true,
            count: recipes.length,
            data: recipes
        });

    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching recipes',
            error: error.message
        });
    }
};

// ============================================
// GET SINGLE RECIPE BY ID
// ============================================
/**
 * @route   GET /api/recipes/:id
 * @desc    Get a single recipe by ID
 * @access  Public
 */
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        // Check if recipe exists
        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        // Send successful response
        res.status(200).json({
            success: true,
            data: recipe
        });

    } catch (error) {
        console.error('Error fetching recipe:', error);

        // Handle invalid MongoDB ID format
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found (invalid ID format)'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while fetching recipe',
            error: error.message
        });
    }
};

// ============================================
// CREATE NEW RECIPE
// ============================================
/**
 * @route   POST /api/recipes
 * @desc    Create a new recipe
 * @access  Public (should be protected in production)
 */
exports.createRecipe = async (req, res) => {
    try {
        // Extract recipe data from request body
        const recipeData = {
            title: req.body.title,
            description: req.body.description,
            ingredients: JSON.parse(req.body.ingredients || '[]'),  // Parse JSON string to array
            instructions: req.body.instructions,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servings: req.body.servings,
            difficulty: req.body.difficulty,
            category: req.body.category,
            author: req.body.author || 'Anonymous',
            tags: JSON.parse(req.body.tags || '[]')
        };

        // Add image path if file was uploaded
        if (req.file) {
            recipeData.image = req.file.filename;  // Store only filename, not full path
        }

        // Create new recipe in database
        const recipe = await Recipe.create(recipeData);

        // Send successful response with created recipe
        res.status(201).json({
            success: true,
            message: 'Recipe created successfully',
            data: recipe
        });

    } catch (error) {
        console.error('Error creating recipe:', error);

        // Delete uploaded image if recipe creation failed
        if (req.file) {
            const imagePath = path.join(__dirname, '../uploads/recipes', req.file.filename);
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Error deleting image:', err);
            });
        }

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
            message: 'Server error while creating recipe',
            error: error.message
        });
    }
};

// ============================================
// UPDATE RECIPE
// ============================================
/**
 * @route   PUT /api/recipes/:id
 * @desc    Update an existing recipe
 * @access  Public (should be protected in production)
 */
exports.updateRecipe = async (req, res) => {
    try {
        // Find recipe by ID
        let recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        // Prepare update data
        const updateData = {
            title: req.body.title,
            description: req.body.description,
            instructions: req.body.instructions,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servings: req.body.servings,
            difficulty: req.body.difficulty,
            category: req.body.category,
            author: req.body.author
        };

        // Parse arrays if provided
        if (req.body.ingredients) {
            updateData.ingredients = JSON.parse(req.body.ingredients);
        }
        if (req.body.tags) {
            updateData.tags = JSON.parse(req.body.tags);
        }

        // Handle image update
        if (req.file) {
            // Delete old image if it exists and is not the default
            if (recipe.image && recipe.image !== 'default-recipe.jpg') {
                const oldImagePath = path.join(__dirname, '../uploads/recipes', recipe.image);
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.error('Error deleting old image:', err);
                });
            }

            // Set new image
            updateData.image = req.file.filename;
        }

        // Update recipe with new data
        recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,              // Return updated document
                runValidators: true     // Run schema validators
            }
        );

        res.status(200).json({
            success: true,
            message: 'Recipe updated successfully',
            data: recipe
        });

    } catch (error) {
        console.error('Error updating recipe:', error);

        // Delete uploaded image if update failed
        if (req.file) {
            const imagePath = path.join(__dirname, '../uploads/recipes', req.file.filename);
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Error deleting image:', err);
            });
        }

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
            message: 'Server error while updating recipe',
            error: error.message
        });
    }
};

// ============================================
// DELETE RECIPE
// ============================================
/**
 * @route   DELETE /api/recipes/:id
 * @desc    Delete a recipe
 * @access  Public (should be protected in production)
 */
exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        // Delete associated image file (if not default)
        if (recipe.image && recipe.image !== 'default-recipe.jpg') {
            const imagePath = path.join(__dirname, '../uploads/recipes', recipe.image);
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Error deleting image:', err);
            });
        }

        // Delete recipe from database
        await Recipe.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Recipe deleted successfully',
            data: {}
        });

    } catch (error) {
        console.error('Error deleting recipe:', error);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found (invalid ID format)'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while deleting recipe',
            error: error.message
        });
    }
};

// ============================================
// ADD RATING TO RECIPE
// ============================================
/**
 * @route   POST /api/recipes/:id/rating
 * @desc    Add a rating to a recipe
 * @access  Public
 */
exports.addRating = async (req, res) => {
    try {
        const { rating } = req.body;

        // Validate rating value
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        // Use the instance method to add rating
        await recipe.addRating(rating);

        res.status(200).json({
            success: true,
            message: 'Rating added successfully',
            data: {
                averageRating: recipe.rating,
                totalReviews: recipe.reviewCount
            }
        });

    } catch (error) {
        console.error('Error adding rating:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while adding rating',
            error: error.message
        });
    }
};

// ============================================
// GET RECIPE STATISTICS
// ============================================
/**
 * @route   GET /api/recipes/stats
 * @desc    Get recipe statistics (total, by category, etc.)
 * @access  Public
 */
exports.getStats = async (req, res) => {
    try {
        const stats = await Recipe.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    avgRating: { $avg: '$rating' },
                    avgPrepTime: { $avg: '$prepTime' },
                    avgCookTime: { $avg: '$cookTime' }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        const totalRecipes = await Recipe.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                total: totalRecipes,
                byCategory: stats
            }
        });

    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching statistics',
            error: error.message
        });
    }
};
