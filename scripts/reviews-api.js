// ============================================
// REVIEWS PAGE - API Integration
// ============================================

const API_BASE = CONFIG.API_BASE_URL + '/api/reviews';

// ============================================
// LOAD APPROVED REVIEWS
// ============================================
async function loadApprovedReviews() {
    try {
        const response = await fetch(`${API_BASE}`);
        const data = await response.json();

        if (data.success) {
            // Filter only approved reviews
            const approvedReviews = data.data.filter(review => review.isApproved);
            renderReviews(approvedReviews);
        } else {
            console.error('Failed to load reviews:', data.message);
        }
    } catch (error) {
        console.error('Error loading reviews:', error);
        // Keep static reviews if API fails
    }
}

// ============================================
// RENDER REVIEWS
// ============================================
function renderReviews(reviews) {
    const reviewsContainer = document.querySelector('.review-card');

    if (!reviews || reviews.length === 0) {
        reviewsContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
          <h3 style="margin-bottom: 10px;">No reviews yet</h3>
          <p>Be the first to share your baking experience!</p>
      </div>
    `;
        return;
    }

    reviewsContainer.innerHTML = reviews.map((review, index) => {
        const stars = Array(5).fill(0).map((_, i) =>
            `<p class="fa fa-star ${i < review.rating ? 'checked' : ''}"></p>`
        ).join('');

        const date = new Date(review.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
      <div class="card-contents" data-aos="fade-up" data-aos-delay="${index * 100}">
        <h3>${review.name}</h3>
        ${stars}
        <p>${review.review}</p>
        <p class="review-date">Reviewed on: ${date}</p>
      </div>
    `;
    }).join('');

    // Refresh AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// ============================================
// SUBMIT REVIEW
// ============================================
async function submitReview(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');

    // Get form values
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]')?.value.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@example.com`;
    const review = form.querySelector('textarea').value.trim();
    const rating = form.querySelector('input[name="rating"]:checked')?.value;

    // Validate
    if (!name || !review || !rating) {
        alert('Please fill in all fields and select a rating!');
        return;
    }

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                rating: parseInt(rating),
                review
            })
        });

        const data = await response.json();

        if (data.success) {
            // Show success message
            alert('✅ Thank you for your review! It will appear on the page after admin approval.');

            // Reset form
            form.reset();
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('Error submitting review. Please try again later.');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    }
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Load approved reviews
    loadApprovedReviews();

    // Setup form submission
    const form = document.querySelector('.js-feedback-form');
    if (form) {
        form.addEventListener('submit', submitReview);
    }
});
