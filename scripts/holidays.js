
function renderHolidaysrecipe(recipes = recipeList) {
  let recipeHTML = '';

  recipes.forEach((recipe) => {
    const html = `
        <div class="card">
            <a href="recipe-template.html?id=${recipe.id}"><img src="${recipe.image}" alt="${recipe.name}"></a>
            <p>${recipe.name}</p>
        </div>
      `;

      recipeHTML += html;
  });

  document.querySelector('.js-recipes').innerHTML = recipeHTML;

}

renderHolidaysrecipe();


// tiny helper — filter by holiday name
function getHolidayRecipes(holidayName, recipes = recipeList) {
  var nameLower = ('' + holidayName).toLowerCase();
  return recipes.filter(function (recipe) {
    if (!recipe || !recipe.holidays) return false;
    if (Array.isArray(recipe.holidays)) {
      return recipe.holidays.some(function (h) { return ('' + h).toLowerCase() === nameLower; });
    }
    return ('' + recipe.holidays).toLowerCase() === nameLower;
  });
}

// render into a specific container selector
function renderHolidaysrecipe(holidayName, containerSelector, recipes = recipeList) {
  var holidayRecipes = getHolidayRecipes(holidayName, recipes);
  var recipeHTML = '';

  holidayRecipes.forEach(function (recipe) {
    var html = '\n    <div class="card">\n      <a href="recipe-template.html?id=' + (recipe.id || '') + '"><img src="' + (recipe.image || '') + '" alt="' + (recipe.name || '') + '"></a>\n      <p>' + (recipe.name || '') + '</p>\n    </div>\n  ';
    recipeHTML += html;
  });

  var container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = recipeHTML || '<p>No recipes yet.</p>';
}

// render each holiday (selectors based on your holidays.html)
renderHolidaysrecipe('Christmas', '#holiday1 .cr-cards');
renderHolidaysrecipe('Thanksgiving', '#holiday2 .cr-cards');
renderHolidaysrecipe('Easter', '#holiday3 .cr-cards');
