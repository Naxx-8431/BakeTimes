// simple mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const toggle = document.getElementById('menu-toggle');
  if (!header || !toggle) return;

  function closeMenu() {
    header.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    header.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', () => {
    header.classList.toggle('menu-open');
    const expanded = header.classList.contains('menu-open');
    toggle.setAttribute('aria-expanded', String(expanded));
  });

  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // close when clicking outside the opened menu
  document.addEventListener('click', (e) => {
    if (!header.classList.contains('menu-open')) return;
    if (!header.contains(e.target)) closeMenu();
  });

  // ensure menu closed when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });
});