// ============================================
// HOLIDAYS PAGE - MongoDB Integration
// ============================================
// Updated version that waits for recipes to load from API

// Wait for recipes to be loaded from API
document.addEventListener('recipesLoaded', function (event) {
  console.log('Recipes loaded, rendering holiday recipes...');
  renderAllHolidays();
});

// Helper function to filter by holiday name
function getHolidayRecipes(holidayName, recipes = recipeList) {
  const nameLower = ('' + holidayName).toLowerCase();
  return recipes.filter(function (recipe) {
    if (!recipe || !recipe.holidays) return false;
    if (Array.isArray(recipe.holidays)) {
      return recipe.holidays.some(function (h) { return ('' + h).toLowerCase() === nameLower; });
    }
    return ('' + recipe.holidays).toLowerCase() === nameLower;
  });
}

// Render holidays recipe into a specific container selector
function renderHolidaysrecipe(holidayName, containerSelector, recipes = recipeList) {
  const holidayRecipes = getHolidayRecipes(holidayName, recipes);
  let recipeHTML = '';

  if (holidayRecipes.length === 0) {
    recipeHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
        <p style="font-size: 18px; margin-bottom: 10px;">🎄 Coming Soon!</p>
        <p>We're working on adding delicious ${holidayName} recipes.</p>
        <p style="font-size: 14px; margin-top: 10px;">Check back soon for festive baking inspiration!</p>
      </div>
    `;
  } else {
    holidayRecipes.forEach(function (recipe, index) {
      const html = `
        <div class="card" data-aos="zoom-in" data-aos-delay="${index * 100}">
          <a href="recipe-template.html?id=${recipe.id || ''}">
            <img src="${recipe.image || 'tumbnail-images/default-recipe.png'}" 
                 alt="${recipe.name || ''}"
                 onerror="this.src='tumbnail-images/default-recipe.png'">
          </a>
          <p>${recipe.name || ''}</p>
        </div>
      `;
      recipeHTML += html;
    });
  }

  const container = document.querySelector(containerSelector);
  if (!container) {
    console.warn(`Container not found: ${containerSelector}`);
    return;
  }
  container.innerHTML = recipeHTML;
  if (typeof AOS !== 'undefined') { AOS.refresh(); }
}

// Render all holidays
function renderAllHolidays() {
  renderHolidaysrecipe('Christmas', '#holiday1 .cr-cards');
  renderHolidaysrecipe('Thanksgiving', '#holiday2 .cr-cards');
  renderHolidaysrecipe('Easter', '#holiday3 .cr-cards');
}

// Initial render (will show "loading" until recipes load)
renderAllHolidays();
