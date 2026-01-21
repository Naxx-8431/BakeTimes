// ============================================
// RECIPE TEMPLATE PAGE - MongoDB Integration
// ============================================
// Updated version that waits for recipes to load from API

// Wait for recipes to be loaded from API
document.addEventListener('recipesLoaded', function (event) {
  console.log('Recipes loaded, rendering recipe details...');
  loadRecipeDetails();
});

function loadRecipeDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id');

  if (!recipeId) {
    document.getElementById('recipe-content').innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <h2>No Recipe Selected</h2>
        <p>Please select a recipe from the recipes page.</p>
        <a href="recipes.html" class="back-button">Browse Recipes</a>
      </div>
    `;
    return;
  }

  const recipe = recipeList.find(r => r.id === recipeId);

  if (!recipe) {
    document.getElementById('recipe-content').innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <h2>Recipe Not Found</h2>
        <p>The recipe you're looking for doesn't exist or has been removed.</p>
        <a href="recipes.html" class="back-button">Browse All Recipes</a>
      </div>
    `;
    if (typeof AOS !== 'undefined') { AOS.refresh(); }
    return;
  }

  // Build ingredients HTML
  const ingredientsHTML = recipe.ingredients && recipe.ingredients.length > 0
    ? recipe.ingredients.map((ing, i) => `<li data-aos="fade-up" data-aos-delay="${i * 50}">${ing}</li>`).join('')
    : '<li>No ingredients listed</li>';

  // Build instructions HTML
  // Instructions are entered one step per line in Admin UI
  let stepsHTML = '';
  if (recipe.instructions) {
    // Split by newlines to get individual steps
    const steps = recipe.instructions
      .split('\n')
      .map(s => s.trim())
      .map(s => s.replace(/^\d+\.\s*/, '')) // Remove leading numbers like "1. " or "2. "
      .filter(s => s.length > 0);

    stepsHTML = steps.map((step, i) =>
      `<li data-aos="fade-up" data-aos-delay="${i * 50}">${step}</li>`
    ).join('');
  }

  if (!stepsHTML) {
    stepsHTML = `<li>${recipe.instructions || 'No instructions provided'}</li>`;
  }

  // Calculate total time
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  // Build tags HTML
  const tagsHTML = recipe.tags && recipe.tags.length > 0
    ? `<div class="meta-item">
         <h4>Tags</h4>
         <p>${recipe.tags.join(', ')}</p>
       </div>`
    : '';

  // Build difficulty HTML
  const difficultyHTML = recipe.difficulty
    ? `<div class="meta-item">
         <h4>Difficulty</h4>
         <p style="text-transform: capitalize;">${recipe.difficulty}</p>
       </div>`
    : '';

  // Build category HTML
  const categoryHTML = recipe.category
    ? `<div class="meta-item">
         <h4>Category</h4>
         <p style="text-transform: capitalize;">${recipe.category}</p>
       </div>`
    : '';

  // Build author HTML
  const authorHTML = recipe.author && recipe.author !== 'Anonymous'
    ? `<div class="meta-item">
         <h4>By</h4>
         <p>${recipe.author}</p>
       </div>`
    : '';

  // Build rating HTML
  const ratingHTML = recipe.rating > 0
    ? `<div class="meta-item">
         <h4>Rating</h4>
         <p>⭐ ${recipe.rating.toFixed(1)} (${recipe.reviewCount || 0} reviews)</p>
       </div>`
    : '';

  document.getElementById('recipe-content').innerHTML = `
    <div class="recipe-header">
      <h1>${recipe.name}</h1>
      <p>${recipe.description || 'A delicious recipe'}</p>
    </div>

    <img src="${recipe.image}" 
         alt="${recipe.name}" 
         class="recipe-image"
         onerror="this.src='tumbnail-images/default-recipe.png'">

    <div class="recipe-meta">
      <div class="meta-item">
        <h4>Prep Time</h4>
        <p>${recipe.prepTime || 0} min</p>
      </div>
      <div class="meta-item">
        <h4>Cook Time</h4>
        <p>${recipe.cookTime || 0} min</p>
      </div>
      <div class="meta-item">
        <h4>Total Time</h4>
        <p>${totalTime} min</p>
      </div>
      <div class="meta-item">
        <h4>Servings</h4>
        <p>${recipe.servings || 1}</p>
      </div>
      ${difficultyHTML}
      ${categoryHTML}
      ${authorHTML}
      ${ratingHTML}
    </div>

    <div class="recipe-section">
      <h2>Ingredients</h2>
      <ul class="ingredients-list">
        ${ingredientsHTML}
      </ul>
    </div>

    <div class="recipe-section">
      <h2>Instructions</h2>
      <ol class="steps-list">
        ${stepsHTML}
      </ol>
    </div>

    ${recipe.tags && recipe.tags.length > 0 ? `
      <div class="notes">
        <strong>Tags:</strong> ${recipe.tags.join(', ')}
      </div>
    ` : ''}
  `;

  // Update page title
  document.title = `${recipe.name} - BAKE TIMES`;

  if (typeof AOS !== 'undefined') { AOS.refresh(); }
}

// Try to load immediately in case recipes are already loaded
if (recipeList && recipeList.length > 0) {
  loadRecipeDetails();
}
