document.addEventListener('DOMContentLoaded', () => {
    // Target the specific subscription form by ID
    const form = document.getElementById('newsletter-form');

    // Fallback if ID is missing (find first form inside .subscription-container)
    const subForm = form || document.querySelector('.subscription-container form');

    if (!subForm) return;

    subForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Stop bubbling if needed to prevent potential double handling, 
        // though typically specific listener wins.
        e.stopPropagation();

        const submitBtn = subForm.querySelector('.submit-btn') || subForm.querySelector('input[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.value : 'Submit';

        if (submitBtn) {
            submitBtn.value = '...';
            submitBtn.disabled = true;
        }

        // Select inputs - assuming order: Name (text), Email (email)
        // Or looking for specific types
        const nameInput = subForm.querySelector('input[type="text"]');
        const emailInput = subForm.querySelector('input[type="email"]');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';

        if (!email) {
            alert('Please enter your email address.');
            if (submitBtn) {
                submitBtn.value = originalBtnText;
                submitBtn.disabled = false;
            }
            return;
        }

        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/api/subscribers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            });

            const data = await response.json();

            if (data.success) {
                alert('✅ ' + data.message);
                subForm.reset();
            } else {
                alert('❌ ' + (data.message || 'Subscription failed.'));
            }
        } catch (error) {
            console.error('Subscription error:', error);
            alert('❌ Server error. Please try again later.');
        } finally {
            if (submitBtn) {
                submitBtn.value = originalBtnText;
                submitBtn.disabled = false;
            }
        }
    });
});
