// scripts/manage-recipes.js

const STORAGE_KEY = 'recipeList';

// Load recipes: localStorage first, then fallback to global recipeList
function loadRecipes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      console.warn('Could not parse stored recipes', e);
    }
  }

  // fallback: accept either a top-level `recipeList` or `window.recipeList`
  if (typeof recipeList !== 'undefined' && Array.isArray(recipeList)) {
    return recipeList.slice();
  }
  if (Array.isArray(window.recipeList)) {
    return window.recipeList.slice();
  }
  return [];
}

function saveRecipes(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// ------ state ------
let recipes = loadRecipes();

// ------ rendering ------
const tableBody = document.getElementById('recipe-table-body');

function renderTable() {
  if (!tableBody) return;

  if (!recipes.length) {
    tableBody.innerHTML = `
      <tr><td colspan="4">No recipes yet. Add one using the form.</td></tr>
    `;
    return;
  }

  tableBody.innerHTML = recipes.map(recipe => {
    const holiday = recipe.holidays || recipe.holiday || '';
    const featured = recipe.featured ? 'Yes' : 'No';

    return `
      <tr data-id="${recipe.id}">
        <td>${recipe.name || ''}</td>
        <td>${holiday ? `<span class="tag">${holiday}</span>` : '-'}</td>
        <td>${featured}</td>
        <td><button class="delete-btn" data-id="${recipe.id}">Delete</button></td>
      </tr>
    `;
  }).join('');
}

// ------ add new recipe ------
const form = document.getElementById('recipe-form');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameEl = document.getElementById('name');
    const imageEl = document.getElementById('image');
    const descEl = document.getElementById('description');
    const holidayEl = document.getElementById('holiday');
    const featuredEl = document.getElementById('featured');

    const name = nameEl.value.trim();
    const image = imageEl.value.trim();

    if (!name || !image) {
      alert('Name and image are required.');
      return;
    }

    const newRecipe = {
      id: Date.now(),        // simple unique id
      name,
      image,
      description: descEl.value.trim(),
      holidays: holidayEl.value || null,
      featured: featuredEl.checked === true
    };

    recipes.push(newRecipe);
    saveRecipes(recipes);
    renderTable();
    form.reset();
  });
}

// ------ delete recipe ------
if (tableBody) {
  tableBody.addEventListener('click', function (e) {
    const btn = e.target.closest('.delete-btn');
    if (!btn) return;

    const id = Number(btn.dataset.id);
    if (!id) return;

    if (!confirm('Delete this recipe?')) return;

    recipes = recipes.filter(r => Number(r.id) !== id);
    saveRecipes(recipes);
    renderTable();
  });
}

// initial render
renderTable();

// Clear all recipes and reload the page (utility - call manually from console if needed)
function clearRecipes() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

document.getElementById('clear-all')?.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete ALL recipes?")) {
        clearRecipes();
    }
});

renderTable();
