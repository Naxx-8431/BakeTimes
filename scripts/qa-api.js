document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('qa-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Stop default feedback handling if needed (though new ID avoids selector collision mostly)
        e.stopPropagation();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Submitting...';
        submitBtn.disabled = true;

        const name = document.getElementById('qa-name').value.trim();
        const email = document.getElementById('qa-email').value.trim();
        const recipeName = document.getElementById('qa-recipe').value.trim();
        const question = document.getElementById('qa-text').value.trim();

        if (!name || !email || !recipeName || !question) {
            alert('Please fill in all fields.');
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
            return;
        }

        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/api/questions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, recipeName, question })
            });

            const data = await response.json();

            if (data.success) {
                alert('✅ ' + data.message);
                form.reset();
            } else {
                alert('❌ ' + (data.message || 'Submission failed'));
            }
        } catch (error) {
            console.error('Error submitting question:', error);
            alert('❌ Server error requesting Q&A. Please try again.');
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // Reset button handler
    const resetBtn = form.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Default reset behavior works, just logging or confirm if needed
        });
    }
});
