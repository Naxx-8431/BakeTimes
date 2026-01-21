// ============================================
// RECIPE MODEL (DATABASE SCHEMA)
// ============================================
// This file defines the structure of recipe data in MongoDB

const mongoose = require('mongoose');

/**
 * Recipe Schema - Defines the structure and validation rules for recipe documents
 * 
 * Each recipe in the database will follow this structure
 */
const recipeSchema = new mongoose.Schema({

    // Recipe Title (e.g., "Chocolate Chip Cookies")
    title: {
        type: String,
        required: [true, 'Recipe title is required'],
        trim: true,           // Removes whitespace from both ends
        maxlength: [100, 'Title cannot exceed 100 characters']
    },

    // Recipe Description/Summary
    description: {
        type: String,
        required: [true, 'Recipe description is required'],
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },

    // List of ingredients (e.g., ["2 cups flour", "1 cup sugar"])
    ingredients: {
        type: [String],       // Array of strings
        required: [true, 'At least one ingredient is required'],
        validate: {
            validator: function (arr) {
                return arr.length > 0;  // Ensure at least one ingredient
            },
            message: 'Recipe must have at least one ingredient'
        }
    },

    // Step-by-step cooking instructions
    instructions: {
        type: String,
        required: [true, 'Cooking instructions are required'],
        trim: true
    },

    // Preparation time in minutes
    prepTime: {
        type: Number,
        required: [true, 'Preparation time is required'],
        min: [1, 'Prep time must be at least 1 minute']
    },

    // Cooking time in minutes
    cookTime: {
        type: Number,
        required: [true, 'Cooking time is required'],
        min: [0, 'Cook time cannot be negative']
    },

    // Number of servings
    servings: {
        type: Number,
        required: [true, 'Number of servings is required'],
        min: [1, 'Servings must be at least 1']
    },

    // Difficulty level (easy, medium, hard)
    difficulty: {
        type: String,
        enum: {
            values: ['easy', 'medium', 'hard'],
            message: 'Difficulty must be easy, medium, or hard'
        },
        default: 'medium'
    },

    // Recipe category (e.g., dessert, main course, appetizer)
    category: {
        type: String,
        required: [true, 'Recipe category is required'],
        trim: true
    },

    // Image file path (stored by Multer)
    image: {
        type: String,
        default: 'default-recipe.jpg'  // Default image if none uploaded
    },

    // Recipe author/creator name
    author: {
        type: String,
        default: 'Anonymous',
        trim: true
    },

    // Average rating (1-5 stars)
    rating: {
        type: Number,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot exceed 5'],
        default: 0
    },

    // Number of reviews/ratings
    reviewCount: {
        type: Number,
        default: 0,
        min: [0, 'Review count cannot be negative']
    },

    // Tags for searching (e.g., ["vegetarian", "gluten-free"])
    tags: {
        type: [String],
        default: []
    },

    // Published status (draft or published)
    isPublished: {
        type: Boolean,
        default: true
    }

}, {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true
});

// ============================================
// INDEXES FOR FASTER QUERIES
// ============================================
// Create indexes on frequently searched fields
recipeSchema.index({ title: 'text', description: 'text' });  // Text search
recipeSchema.index({ category: 1 });                         // Category filter
recipeSchema.index({ difficulty: 1 });                       // Difficulty filter
recipeSchema.index({ rating: -1 });                          // Sort by rating

// ============================================
// VIRTUAL PROPERTIES
// ============================================
// Calculate total time (prep + cook) without storing it in database
recipeSchema.virtual('totalTime').get(function () {
    return this.prepTime + this.cookTime;
});

// Ensure virtuals are included when converting to JSON
recipeSchema.set('toJSON', { virtuals: true });
recipeSchema.set('toObject', { virtuals: true });

// ============================================
// INSTANCE METHODS
// ============================================
/**
 * Add a rating to the recipe and update average
 * @param {Number} newRating - Rating value (1-5)
 */
recipeSchema.methods.addRating = function (newRating) {
    const totalRating = (this.rating * this.reviewCount) + newRating;
    this.reviewCount += 1;
    this.rating = totalRating / this.reviewCount;
    return this.save();
};

// Create and export the Recipe model
// This allows us to perform CRUD operations on the recipes collection
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
