// ============================================
// API INTEGRATION - Fetch Recipes from MongoDB
// ============================================
// This file replaces the static recipe-Collections.js with dynamic API calls

const API_BASE = 'http://localhost:5000/api/recipes';

// Global variable to store recipes (maintains compatibility with existing code)
let recipeList = [];

// ============================================
// FETCH RECIPES FROM BACKEND
// ============================================
async function loadRecipesFromAPI() {
    try {
        const response = await fetch(API_BASE);
        const data = await response.json();

        if (data.success) {
            // Transform MongoDB recipes to match existing format
            recipeList = data.data.map(recipe => ({
                id: recipe._id,
                name: recipe.title,
                image: `http://localhost:5000/uploads/recipes/${recipe.image}`,
                description: recipe.description,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
                prepTime: recipe.prepTime,
                cookTime: recipe.cookTime,
                servings: recipe.servings,
                difficulty: recipe.difficulty,
                category: recipe.category,
                author: recipe.author,
                rating: recipe.rating,
                reviewCount: recipe.reviewCount,
                tags: recipe.tags || [],
                // Check if recipe has 'featured' tag, or is dessert, or has high rating
                featured: recipe.tags?.includes('featured') || recipe.category === 'dessert' || recipe.rating >= 4,
                holidays: recipe.tags?.includes('christmas') ? 'Christmas' :
                    recipe.tags?.includes('thanksgiving') ? 'Thanksgiving' :
                        recipe.tags?.includes('easter') ? 'Easter' : null
            }));

            console.log(`✅ Loaded ${recipeList.length} recipes from MongoDB`);
            return recipeList;
        } else {
            console.error('Failed to load recipes:', data.message);
            return [];
        }
    } catch (error) {
        console.error('Error loading recipes from API:', error);
        console.warn('⚠️ Make sure the backend server is running on http://localhost:5000');
        return [];
    }
}

// ============================================
// INITIALIZE - Load recipes when page loads
// ============================================
// This ensures recipes are loaded before other scripts try to use them
(async function initializeRecipes() {
    await loadRecipesFromAPI();

    // Trigger custom event to notify other scripts that recipes are ready
    const event = new CustomEvent('recipesLoaded', { detail: { recipes: recipeList } });
    document.dispatchEvent(event);
})();

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get recipe by ID
 */
function getRecipeById(id) {
    return recipeList.find(recipe => recipe.id === id);
}

/**
 * Search recipes by name
 */
function searchRecipes(searchTerm) {
    const term = searchTerm.toLowerCase();
    return recipeList.filter(recipe =>
        recipe.name.toLowerCase().includes(term) ||
        recipe.description.toLowerCase().includes(term) ||
        recipe.category.toLowerCase().includes(term)
    );
}

/**
 * Filter recipes by category
 */
function filterByCategory(category) {
    return recipeList.filter(recipe =>
        recipe.category.toLowerCase() === category.toLowerCase()
    );
}

/**
 * Filter recipes by difficulty
 */
function filterByDifficulty(difficulty) {
    return recipeList.filter(recipe =>
        recipe.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
}

/**
 * Get featured recipes
 */
function getFeaturedRecipes() {
    return recipeList.filter(recipe => recipe.featured === true);
}

/**
 * Refresh recipes from API
 */
async function refreshRecipes() {
    await loadRecipesFromAPI();
    // Trigger event for other scripts to re-render
    const event = new CustomEvent('recipesLoaded', { detail: { recipes: recipeList } });
    document.dispatchEvent(event);
    return recipeList;
}
