document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = parseInt(urlParams.get('id'));

  const recipe = recipeList.find(r => r.id === recipeId);
  if (!recipe) {
    document.getElementById('recipe-content').innerHTML = '<p>Recipe not found.</p>';
    if (typeof AOS !== 'undefined') { AOS.refresh(); }
    return;
  }

  const ingredientsHTML = recipe.ingredients.map((ing, i) => `<li data-aos="fade-up" data-aos-delay="${i * 100}">${ing}</li>`).join('');
  const stepsHTML = recipe.steps.map((step, i) => `<li data-aos="fade-up" data-aos-delay="${i * 100}">${step}</li>`).join('');
  const notesHTML = recipe.notes ? `<div class="notes"><strong>Chef's Note:</strong> ${recipe.notes}</div>` : '';

  document.getElementById('recipe-content').innerHTML = `
    <div class="recipe-header">
      <h1>${recipe.name}</h1>
      <p>${recipe.description}</p>
    </div>

    <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">

    <div class="recipe-meta">
      <div class="meta-item">
        <h4>Prep Time</h4>
        <p>${recipe.prepTime}</p>
      </div>
      <div class="meta-item">
        <h4>Cook Time</h4>
        <p>${recipe.cookTime}</p>
      </div>
      <div class="meta-item">
        <h4>Total Time</h4>
        <p>${recipe.totalTime}</p>
      </div>
      <div class="meta-item">
        <h4>Servings</h4>
        <p>${recipe.servings}</p>
      </div>
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

    ${notesHTML}
  `;
  if (typeof AOS !== 'undefined') { AOS.refresh(); }
});