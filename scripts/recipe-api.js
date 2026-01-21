// ============================================
// RECIPES PAGE - MongoDB Integration
// ============================================
// Updated version that waits for recipes to load from API

// Wait for recipes to be loaded from API
document.addEventListener('recipesLoaded', function (event) {
    console.log('Recipes loaded, rendering recipe lists...');
    renderFeaturedRecipes();
    recipeListHTML();
});

function renderFeaturedRecipes(recipes = recipeList) {
    const featuredRecipes = recipes.filter(recipe => recipe.featured === true);

    if (featuredRecipes.length === 0) {
        document.querySelector('.js-Featured-Recipes').innerHTML =
            '<p style="text-align:center; color:#666; grid-column: 1/-1;">No featured recipes yet.</p>';
        return;
    }

    let featuredRecipeHTML = '';

    featuredRecipes.forEach((recipe, index) => {
        const aos = index % 2 === 0 ? 'fade-up' : 'fade-up';
        const featuredHTML = `
    <div class="recipe-card" data-aos="${aos}" data-aos-delay="${index * 100}">
        <a href="recipe-template.html?id=${recipe.id}"><img src="${recipe.image}" alt="${recipe.name}" class="recipe-image" onerror="this.src='tumbnail-images/default-recipe.png'"></a>
        <div class="recipe-title">
            <p>${recipe.name}</p>
        </div>
    </div>
  `;

        featuredRecipeHTML += featuredHTML;
    });

    document.querySelector('.js-Featured-Recipes').innerHTML = featuredRecipeHTML;
    if (typeof AOS !== 'undefined') { AOS.refresh(); }

};

renderFeaturedRecipes();




function recipeListHTML(recipes = recipeList) {

    if (recipes.length === 0) {
        document.querySelector('.js-recipes').innerHTML =
            '<p style="text-align:center; color:#666; grid-column: 1/-1;">No recipes found. Try a different search or add recipes through the Admin UI!</p>';
        return;
    }

    let recipeHTML = '';

    recipes.forEach((recipe, index) => {
        const html = `
        <div class="recipe-card" data-aos="fade-up" data-aos-delay="${index * 100}">
          <a href="recipe-template.html?id=${recipe.id}"><img src="${recipe.image}" alt="${recipe.name}" class="recipe-image" onerror="this.src='tumbnail-images/default-recipe.png'"></a>
          <div class="recipe-title">
              <p>${recipe.name}</p>
          </div>
        </div>
      `;

        recipeHTML += html;
    });

    document.querySelector('.js-recipes').innerHTML = recipeHTML;
    if (typeof AOS !== 'undefined') { AOS.refresh(); }

};

recipeListHTML();


const featuredRecipes = document.getElementById('featured-Section');
const featuredRecipesText = document.querySelector('.js-recipeText');
const allRecipesText = document.querySelector('.js-allRecipeText');
const Line = document.querySelector('.js-line');



document.getElementById('bar').addEventListener('input', (event) => {

    const searchText = event.target.value.toLowerCase();


    const filteredRecipes = recipeList.filter(recipe =>
        recipe.name.toLowerCase().includes(searchText) ||
        recipe.description.toLowerCase().includes(searchText) ||
        recipe.category.toLowerCase().includes(searchText)
    );


    if (searchText.trim() !== '') {
        featuredRecipes.style.display = 'none';
        featuredRecipesText.style.display = 'none';
        allRecipesText.style.display = 'none';
        Line.style.display = 'none';
    } else {
        featuredRecipes.style.display = 'grid';
        featuredRecipesText.style.display = 'block';
        allRecipesText.style.display = 'block';
        Line.style.display = 'block';
    }

    recipeListHTML(filteredRecipes);

});
