// Admin Control - MongoDB Backend Integration
// API Base URL
const API_BASE = 'http://localhost:5000/api/recipes';

// ============================================
// FETCH ALL RECIPES FROM BACKEND
// ============================================
async function loadRecipes() {
  try {
    const response = await fetch(API_BASE);
    const data = await response.json();

    if (data.success) {
      return data.data; // Array of recipes
    } else {
      console.error('Failed to load recipes:', data.message);
      return [];
    }
  } catch (error) {
    console.error('Error loading recipes:', error);
    showStatus('Error loading recipes. Make sure the server is running!', 'error');
    return [];
  }
}

// ============================================
// RENDER RECIPE TABLE
// ============================================
const tableBody = document.getElementById('recipe-table-body');

async function renderTable() {
  if (!tableBody) return;

  // Show loading
  tableBody.innerHTML = '<tr><td colspan="6">Loading recipes...</td></tr>';

  const recipes = await loadRecipes();

  if (!recipes.length) {
    tableBody.innerHTML = `
      <tr><td colspan="6">No recipes yet. Add one using the form above!</td></tr>
    `;
    return;
  }

  tableBody.innerHTML = recipes.map(recipe => {
    const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
    const imageUrl = recipe.image
      ? `http://localhost:5000/uploads/recipes/${recipe.image}`
      : 'https://via.placeholder.com/50';

    return `
      <tr data-id="${recipe._id}">
        <td><img src="${imageUrl}" alt="${recipe.title}" class="recipe-image" onerror="this.src='https://via.placeholder.com/50'"></td>
        <td><strong>${recipe.title || 'Untitled'}</strong></td>
        <td><span class="tag">${recipe.category || 'N/A'}</span></td>
        <td><span class="tag">${recipe.difficulty || 'N/A'}</span></td>
        <td>${totalTime} min</td>
        <td><button class="delete-btn" data-id="${recipe._id}">Delete</button></td>
      </tr>
    `;
  }).join('');
}

// ============================================
// ADD NEW RECIPE
// ============================================
const form = document.getElementById('recipe-form');
const statusEl = document.getElementById('form-status');

function showStatus(message, type = 'success') {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.className = type;
  setTimeout(() => {
    statusEl.textContent = '';
    statusEl.className = '';
  }, 5000);
}

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    showStatus('Uploading recipe...', 'success');

    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Get form values
      const title = document.getElementById('title').value.trim();
      const description = document.getElementById('description').value.trim();
      const ingredientsText = document.getElementById('ingredients').value.trim();
      const instructions = document.getElementById('instructions').value.trim();
      const prepTime = document.getElementById('prepTime').value;
      const cookTime = document.getElementById('cookTime').value;
      const servings = document.getElementById('servings').value;
      const difficulty = document.getElementById('difficulty').value;
      const category = document.getElementById('category').value;
      const imageFile = document.getElementById('image').files[0];
      const author = document.getElementById('author').value.trim();
      const tagsText = document.getElementById('tags').value.trim();

      // Convert ingredients (one per line) to array
      const ingredients = ingredientsText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

      // Convert tags (comma-separated) to array
      const tags = tagsText
        ? tagsText.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      // Validate
      if (!title || !description || ingredients.length === 0 || !instructions) {
        showStatus('Please fill in all required fields!', 'error');
        submitBtn.disabled = false;
        return;
      }

      // Append data to FormData
      formData.append('title', title);
      formData.append('description', description);
      formData.append('ingredients', JSON.stringify(ingredients));
      formData.append('instructions', instructions);
      formData.append('prepTime', prepTime);
      formData.append('cookTime', cookTime);
      formData.append('servings', servings);
      formData.append('difficulty', difficulty);
      formData.append('category', category);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (author) {
        formData.append('author', author);
      }

      if (tags.length > 0) {
        formData.append('tags', JSON.stringify(tags));
      }

      // Send to backend
      const response = await fetch(API_BASE, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        showStatus('✅ Recipe added successfully!', 'success');
        form.reset();
        renderTable(); // Refresh the list
      } else {
        showStatus('❌ Error: ' + (data.message || 'Failed to add recipe'), 'error');
      }

    } catch (error) {
      console.error('Error adding recipe:', error);
      showStatus('❌ Error: ' + error.message, 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });
}

// ============================================
// DELETE RECIPE
// ============================================
if (tableBody) {
  tableBody.addEventListener('click', async function (e) {
    const btn = e.target.closest('.delete-btn');
    if (!btn) return;

    const id = btn.dataset.id;
    if (!id) return;

    if (!confirm('Delete this recipe? This action cannot be undone!')) return;

    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        showStatus('✅ Recipe deleted successfully!', 'success');
        renderTable(); // Refresh the list
      } else {
        showStatus('❌ Error: ' + (data.message || 'Failed to delete recipe'), 'error');
      }

    } catch (error) {
      console.error('Error deleting recipe:', error);
      showStatus('❌ Error: ' + error.message, 'error');
    }
  });
}

// ============================================
// REFRESH BUTTON
// ============================================
const refreshBtn = document.getElementById('refresh-list');
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => {
    renderTable();
    showStatus('List refreshed!', 'success');
  });
}

// ============================================
// INITIAL LOAD
// ============================================
renderTable();
