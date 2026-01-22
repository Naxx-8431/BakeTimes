// Admin Control - MongoDB Backend Integration
// API Base URL
const API_BASE = CONFIG.API_BASE_URL + '/api/recipes';

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
      ? `${CONFIG.API_BASE_URL}/uploads/recipes/${recipe.image}`
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
      const holiday = document.getElementById('holiday').value;
      const featured = document.getElementById('featured').checked;

      // Convert ingredients (one per line) to array
      const ingredients = ingredientsText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

      // Convert tags (comma-separated) to array
      let tags = tagsText
        ? tagsText.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      // Automatically add holiday to tags if selected
      if (holiday && !tags.includes(holiday)) {
        tags.push(holiday);
      }

      // Add 'featured' tag if checkbox is checked
      if (featured && !tags.includes('featured')) {
        tags.push('featured');
      }

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


// ============================================
// ============================================
// REVIEW MANAGEMENT SECTION
// ============================================
// ============================================

const REVIEW_API_BASE = CONFIG.API_BASE_URL + '/api/reviews';

// Status helper for reviews
function showReviewStatus(message, type) {
  const el = document.getElementById('review-status');
  if (!el) return;
  el.textContent = message;
  el.style.color = type === 'success' ? '#27ae60' : '#c0392b';
  setTimeout(() => {
    el.textContent = '';
  }, 5000);
}

// ============================================
// LOAD REVIEWS
// ============================================
async function loadReviews() {
  try {
    const response = await fetch(REVIEW_API_BASE);
    const data = await response.json();

    if (data.success) {
      renderReviews(data.data);
      updateReviewStats(data.data);
    } else {
      showReviewStatus('Failed to load reviews: ' + data.message, 'error');
    }
  } catch (error) {
    console.error('Error loading reviews:', error);
    showReviewStatus('Error loading reviews.', 'error');
  }
}

// ============================================
// RENDER REVIEWS
// ============================================
function renderReviews(reviews) {
  const tbody = document.getElementById('reviews-tbody');
  if (!tbody) return;

  if (reviews.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 20px;">No reviews yet.</td></tr>';
    return;
  }

  tbody.innerHTML = reviews.map(review => {
    const date = new Date(review.createdAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
    const stars = '⭐'.repeat(review.rating);
    const statusBadges = `
      ${review.isApproved ? '<span class="badge badge-approved">Approved</span>' : '<span class="badge badge-pending">Pending</span>'}
      ${review.isFeatured ? '<span class="badge badge-featured">Featured</span>' : ''}
    `;

    // Action Buttons
    const approveRejectBtn = review.isApproved
      ? `<button class="btn-sm btn-reject" onclick="window.updateReviewStatus('${review._id}', false, false)">Reject</button>`
      : `<button class="btn-sm btn-approve" onclick="window.updateReviewStatus('${review._id}', true, false)">Approve</button>`;

    const featureBtn = review.isApproved
      ? (review.isFeatured
        ? `<button class="btn-sm btn-unfeature" onclick="window.toggleFeatured('${review._id}')">Unfeature</button>`
        : `<button class="btn-sm btn-feature" onclick="window.toggleFeatured('${review._id}')">Feature</button>`)
      : '';

    return `
      <tr data-id="${review._id}">
        <td>${date}</td>
        <td><strong>${review.name}</strong></td>
        <td>${review.email}</td>
        <td class="rating">${stars}</td>
        <td class="review-text">${review.review}</td>
        <td>${statusBadges}</td>
        <td>
          <div class="action-buttons">
            ${approveRejectBtn}
            ${featureBtn}
            <button class="btn-sm btn-delete-review" onclick="window.deleteReview('${review._id}')">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ============================================
// UPDATE REVIEWS STATS
// ============================================
function updateReviewStats(reviews) {
  const total = reviews.length;
  const approved = reviews.filter(r => r.isApproved).length;
  const pending = reviews.filter(r => !r.isApproved).length;
  const featured = reviews.filter(r => r.isFeatured).length;

  const elTotal = document.getElementById('total-count');
  const elApproved = document.getElementById('approved-count');
  const elPending = document.getElementById('pending-count');
  const elFeatured = document.getElementById('featured-count');

  if (elTotal) elTotal.textContent = total;
  if (elApproved) elApproved.textContent = approved;
  if (elPending) elPending.textContent = pending;
  if (elFeatured) elFeatured.textContent = `${featured} / 4`;
}

// ============================================
// REVIEW ACTIONS (Global Scope)
// ============================================
window.updateReviewStatus = async function (id, isApproved, isFeatured) {
  try {
    const response = await fetch(`${REVIEW_API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isApproved, isFeatured })
    });
    const data = await response.json();
    if (data.success) {
      showReviewStatus(`Review ${isApproved ? 'approved' : 'rejected'} successfully!`, 'success');
      loadReviews();
    } else {
      showReviewStatus('Error: ' + data.message, 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showReviewStatus('Error updating status', 'error');
  }
};

window.toggleFeatured = async function (id) {
  try {
    const response = await fetch(`${REVIEW_API_BASE}/${id}/toggle-featured`, { method: 'PUT' });
    const data = await response.json();
    if (data.success) {
      showReviewStatus(data.message, 'success');
      loadReviews();
    } else {
      showReviewStatus('Error: ' + data.message, 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showReviewStatus('Error toggling featured', 'error');
  }
};

window.deleteReview = async function (id) {
  if (!confirm('Delete this review permanently?')) return;
  try {
    const response = await fetch(`${REVIEW_API_BASE}/${id}`, { method: 'DELETE' });
    const data = await response.json();
    if (data.success) {
      showReviewStatus('Review deleted!', 'success');
      loadReviews();
    } else {
      showReviewStatus('Error deletion failed', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showReviewStatus('Error deleting review', 'error');
  }
};

// ============================================
// EVENTS
// ============================================
const refreshReviewsBtn = document.getElementById('refresh-reviews');
if (refreshReviewsBtn) {
  refreshReviewsBtn.addEventListener('click', () => {
    loadReviews();
    showReviewStatus('Reviews refreshed!', 'success');
  });
}

// Initial Load
loadReviews();


// ============================================
// ============================================
// SUBSCRIBER MANAGEMENT SECTION
// ============================================
// ============================================

const SUBSCRIBER_API_BASE = CONFIG.API_BASE_URL + '/api/subscribers';

function showSubscriberStatus(message, type) {
  const el = document.getElementById('subscriber-status');
  if (!el) return;
  el.textContent = message;
  el.style.color = type === 'success' ? '#27ae60' : '#c0392b';
  setTimeout(() => { el.textContent = ''; }, 5000);
}

async function loadSubscribers() {
  try {
    const response = await fetch(SUBSCRIBER_API_BASE);
    const data = await response.json();

    if (data.success) {
      renderSubscribers(data.data);
      if (document.getElementById('sub-total-count')) {
        document.getElementById('sub-total-count').textContent = data.count;
      }
    } else {
      showSubscriberStatus('Failed to load: ' + data.message, 'error');
    }
  } catch (error) {
    console.error('Error loading subscribers:', error);
    showSubscriberStatus('Error loading subscribers', 'error');
  }
}

function renderSubscribers(subscribers) {
  const tbody = document.getElementById('subscribers-tbody');
  if (!tbody) return;

  if (!subscribers || subscribers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px;">No subscribers yet.</td></tr>';
    return;
  }

  tbody.innerHTML = subscribers.map(sub => {
    const date = new Date(sub.createdAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });

    return `
      <tr>
        <td>${date}</td>
        <td>${sub.email}</td>
        <td>${sub.name || '-'}</td>
        <td>
           <button class="btn-sm btn-delete-review" onclick="window.deleteSubscriber('${sub._id}')">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

window.deleteSubscriber = async function (id) {
  if (!confirm('Remove this subscriber?')) return;
  try {
    const response = await fetch(`${SUBSCRIBER_API_BASE}/${id}`, { method: 'DELETE' });
    const data = await response.json();
    if (data.success) {
      showSubscriberStatus('Subscriber removed', 'success');
      loadSubscribers();
    } else {
      showSubscriberStatus('Error: ' + data.message, 'error');
    }
  } catch (e) {
    showSubscriberStatus('Error deleting', 'error');
  }
}

const refreshSubBtn = document.getElementById('refresh-subscribers');
if (refreshSubBtn) {
  refreshSubBtn.addEventListener('click', () => {
    loadSubscribers();
    showSubscriberStatus('Refreshed!', 'success');
  });
}

// Init
loadSubscribers();


// ============================================
// ============================================
// Q&A MANAGEMENT SECTION
// ============================================
// ============================================

const QA_API_BASE = CONFIG.API_BASE_URL + '/api/questions';

function showQAStatus(message, type) {
  const el = document.getElementById('qa-status');
  if (!el) return;
  el.textContent = message;
  el.style.color = type === 'success' ? '#27ae60' : '#c0392b';
  setTimeout(() => { el.textContent = ''; }, 5000);
}

async function loadQuestions() {
  try {
    const response = await fetch(QA_API_BASE);
    const data = await response.json();

    if (data.success) {
      renderQuestions(data.data);
      if (document.getElementById('qa-total-count')) {
        document.getElementById('qa-total-count').textContent = data.count;
      }
    } else {
      showQAStatus('Failed to load: ' + data.message, 'error');
    }
  } catch (error) {
    console.error('Error loading questions:', error);
    showQAStatus('Error loading questions', 'error');
  }
}

function renderQuestions(questions) {
  const tbody = document.getElementById('qa-tbody');
  if (!tbody) return;

  if (!questions || questions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">No questions yet.</td></tr>';
    return;
  }

  tbody.innerHTML = questions.map(q => {
    const date = new Date(q.createdAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });

    return `
      <tr>
        <td>${date}</td>
        <td>${q.name}</td>
        <td>${q.email}</td>
        <td>${q.recipeName}</td>
        <td>${q.question}</td>
        <td>
           <button class="btn-sm btn-delete-review" onclick="window.deleteQuestion('${q._id}')">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

window.deleteQuestion = async function (id) {
  if (!confirm('Delete this question?')) return;
  try {
    const response = await fetch(`${QA_API_BASE}/${id}`, { method: 'DELETE' });
    const data = await response.json();
    if (data.success) {
      showQAStatus('Question deleted', 'success');
      loadQuestions();
    } else {
      showQAStatus('Error: ' + data.message, 'error');
    }
  } catch (e) {
    showQAStatus('Error deleting', 'error');
  }
}

const refreshQABtn = document.getElementById('refresh-qa');
if (refreshQABtn) {
  refreshQABtn.addEventListener('click', () => {
    loadQuestions();
    showQAStatus('Refreshed!', 'success');
  });
}

// Init
loadQuestions();
