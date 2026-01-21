// form-feedback.js — toast version
document.addEventListener('DOMContentLoaded', function () {

  // Create a toast element (appended to body)
  function createToast(text) {
    var t = document.createElement('div');
    t.className = 'form-toast';
    t.setAttribute('role', 'status');
    t.setAttribute('aria-live', 'polite');
    t.innerHTML = '<div class="form-toast-inner">' + text + '</div>';
    if (typeof AOS !== 'undefined') { AOS.refresh(); }
    return t;
  }

  // Show toast with duration (ms)
  function showToast(text, duration) {
    // prevent multiple toasts stacking — reuse existing if present
    var existing = document.querySelector('.form-toast');
    if (existing) {
      // update text and reset timer
      existing.querySelector('.form-toast-inner').textContent = text;
      clearTimeout(existing._toastTimeout);
      existing.classList.remove('form-toast--hide');
      existing.classList.add('form-toast--visible');
      existing._toastTimeout = setTimeout(function () {
        existing.classList.remove('form-toast--visible');
        existing.classList.add('form-toast--hide');
        // remove after hide transition
        setTimeout(function () {
          if (existing.parentNode) existing.parentNode.removeChild(existing);
        }, 300);
      }, duration);
      return;
    }

    var toast = createToast(text);

    // append to body
    document.body.appendChild(toast);
    if (typeof AOS !== 'undefined') { AOS.refresh(); }

    // force reflow then show
    // eslint-disable-next-line no-unused-expressions
    toast.offsetHeight;
    toast.classList.add('form-toast--visible');

    // hide after duration
    toast._toastTimeout = setTimeout(function () {
      toast.classList.remove('form-toast--visible');
      toast.classList.add('form-toast--hide');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300); // match CSS transition
    }, duration);
  }

  // Attach to forms with class .js-feedback-form
  var forms = document.querySelectorAll('form.js-feedback-form');
  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault(); // prevent actual submission for now (keep original behavior)

      // read duration from data-confirm-duration or default to 3500ms
      var durAttr = parseInt(form.getAttribute('data-confirm-duration'), 10);
      var duration = Number.isFinite(durAttr) && durAttr > 0 ? durAttr : 3500; // default 3500ms

      //customize message via data attribute
      var message = form.getAttribute('data-confirm-text') || 'Sent Successfully!';

      // show the toast
      showToast(message, duration);

      
      form.reset();

      // Actual submit form with XHR/fetch
      // Example template:
      // var data = new FormData(form);
      // fetch(form.action || '#', { method: form.method || 'POST', body: data })
      //   .then(function(res){ showToast(message, duration); })
      //   .catch(function(){ showToast('Submission failed', duration); });
    });
  });

});
