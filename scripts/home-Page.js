function renderFeaturedRecipes(recipes = recipeList) {
  const featuredRecipes = recipes.filter(recipe => recipe.featured === true);

  let featuredRecipeHTML = '';

  featuredRecipes.forEach((recipe, index) => {
    const aos = index % 2 === 0 ? 'fade-right' : 'fade-left';
    const imageDiv = `<div class="fr-image"><img class="ricipe-img" src="${recipe.image}" alt="${recipe.name}"></div>`;
    const contentDiv = `
      <div class="fr-content">
        <h4>${recipe.name}</h4>
        <p>${recipe.description}</p>
        <a href="recipe-template.html?id=${recipe.id}" class="recipe-link">Explore Here</a>
      </div>
    `;

    // Alternate layout: odd index = image first, even index = content first
    const layout = index % 2 === 1 ? imageDiv + contentDiv : contentDiv + imageDiv;

    const cardHTML = `<div class="fr-card" data-aos="${aos}" data-aos-delay="${index * 100}">${layout}</div>`;
    featuredRecipeHTML += cardHTML;
  });

  document.querySelector('.featured-recipes-cards').innerHTML = featuredRecipeHTML;
  if (typeof AOS !== 'undefined') { AOS.refresh(); }
}

renderFeaturedRecipes();



function recipeButton() {
  const btns = document.querySelectorAll('.js-recipe-button');
  if (!btns || btns.length === 0) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => { window.location.href = 'recipes.html'; });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
}

recipeButton();



// popup menu


function createContactPopup() {
  if (document.getElementById('contact-popup')) return;

  // inject styles once
  if (!document.getElementById('contact-popup-styles')) {
    const style = document.createElement('style');
    style.id = 'contact-popup-styles';
    style.textContent = `
      #contact-popup { position: fixed; inset: 0; display:flex; align-items:center; justify-content:center; background: rgba(0,0,0,0.4); z-index:10000; }
      #contact-popup .modal { background:#fff; padding:20px 24px; border-radius:8px; max-width:340px; width:90%; box-shadow:0 8px 24px rgba(0,0,0,0.2); text-align:center; }
      #contact-popup h3 { margin:0 0 12px; font-size:20px; letter-spacing:0.5px; }
      #contact-popup .links { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
      #contact-popup .links a { display:flex; gap:10px; align-items:center; text-decoration:none; color:#333; padding:8px 10px; border-radius:6px; transition:background .12s; }
      #contact-popup .links a:hover { background:#f2f2f2; }
      #contact-popup .links i { font-size:18px; width:22px; text-align:center; }
      #contact-popup .close { position:absolute; top:12px; right:12px; background:transparent; border:none; font-size:18px; cursor:pointer; }
      @media (min-width:420px){ #contact-popup .modal { max-width:380px; } }
    `;
    document.head.appendChild(style);
    if (typeof AOS !== 'undefined') { AOS.refresh(); }
  }

  const wrapper = document.createElement('div');
  wrapper.id = 'contact-popup';
  wrapper.innerHTML = `
    <div class="modal" role="dialog" aria-labelledby="contact-title">
      <button class="close" aria-label="Close contact popup">&times;</button>
      <h3 id="contact-title">CONTACT US</h3>
      <ul class="links">
        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i class="fa fa-facebook"></i> Facebook</a></li>
        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i class="fa fa-twitter"></i> X</a></li>
        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i class="fa fa-instagram"></i> Instagram</a></li>
      </ul>
    </div>
  `;
  if (typeof AOS !== 'undefined') { AOS.refresh(); }

  // close handlers
  const modal = wrapper.querySelector('.modal');
  wrapper.addEventListener('click', (e) => {
    if (e.target === wrapper) removePopup();
  });
  wrapper.querySelector('.close').addEventListener('click', removePopup);
  document.addEventListener('keydown', escHandler);

  function escHandler(e) { if (e.key === 'Escape') removePopup(); }
  function removePopup() {
    document.removeEventListener('keydown', escHandler);
    wrapper.remove();
  }

  document.body.appendChild(wrapper);
  if (typeof AOS !== 'undefined') { AOS.refresh(); }
  // focus first link
  const firstLink = wrapper.querySelector('.links a');
  if (firstLink) firstLink.focus();
}

function setupContactButton() {
  const btn = document.querySelector('.btn.cu');
  if (!btn) return;
  btn.addEventListener('click', () => createContactPopup());
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      createContactPopup();
    }
  });
}

setupContactButton();