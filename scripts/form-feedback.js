// scripts/form-feedback.js
// Lightweight: show "SENT" centered on a form for a short time when submitted.
// Usage: add class "js-feedback-form" to any form you want this behavior on.
// Optionally set data-confirm-duration (ms) on the form. Default 3500 ms.

document.addEventListener('DOMContentLoaded', function () {

  // Create overlay element for reuse (we clone per form)
  function createOverlay() {
    var o = document.createElement('div');
    o.className = 'form-sent-overlay';
    o.setAttribute('role', 'status');
    o.setAttribute('aria-live', 'polite');
    o.innerHTML = '<span class="form-sent-text">SENT</span>';
    return o;
  }

  // Show overlay centered inside form
  function showOverlay(form, duration) {
    // prevent multiple overlays
    if (form._sentOverlayVisible) return;
    form._sentOverlayVisible = true;

    // save current tabindex and focusable state optionally
    var overlay = createOverlay();
    // position overlay inside form
    form.style.position = form.style.position || getComputedStyle(form).position === 'static' ? 'relative' : form.style.position;
    overlay.style.position = 'absolute';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.background = 'rgba(255, 255, 255, 0.37)';
    overlay.style.color = '#343E51';
    overlay.style.zIndex = 9999;
    overlay.style.pointerEvents = 'none'; // allow clicks to pass through if needed
    // Add fade-in class for CSS animation
    overlay.classList.add('form-sent-overlay--visible');
    form.appendChild(overlay);

    // Optionally clear or reset the form fields (comment/uncomment as required)
    // form.reset();

    // Restore after duration
    setTimeout(function () {
      overlay.classList.remove('form-sent-overlay--visible');
      // remove overlay after fadeout transition (use same duration in CSS)
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        form._sentOverlayVisible = false;
      }, 300); // wait for CSS fade-out (small)
    }, duration);
  }

  // Attach to forms with class .js-feedback-form
  var forms = document.querySelectorAll('form.js-feedback-form');
  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault(); // prevent actual submission for now (you can adjust)
      // If you want to still submit via fetch/XHR, do it here and show overlay on success.
      var durAttr = parseInt(form.getAttribute('data-confirm-duration'), 10);
      var duration = Number.isFinite(durAttr) && durAttr > 0 ? durAttr : 3500; // default 3500ms

      showOverlay(form, duration);

      // If you want to actually submit the form to server, do it here:
      // Example: (uncomment and adapt)
      // var xhr = new XMLHttpRequest();
      // xhr.open(form.method || 'POST', form.action || '#', true);
      // xhr.onload = function() { showOverlay(form, duration); };
      // xhr.onerror = function() { alert('Submission failed'); };
      // var data = new FormData(form);
      // xhr.send(data);
    });
  });

});
