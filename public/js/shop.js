let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const PRODUCTS_PER_PAGE = 6;
let activeFilters = {
  brewingTechnique: '',
  roastColor: ''
};

async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    allProducts = await response.json();
    applyFilters();
  } catch (error) {
    document.getElementById('products').innerHTML = '<p class="error-message">Could not load products. Please make sure the backend server is running.</p>';
  }
}

function applyFilters() {
  const brewing = activeFilters.brewingTechnique;
  const roast = activeFilters.roastColor;

  let filtered = allProducts;

  // Espresso + any roast color = NO PRODUCTS
  if (brewing === 'Espresso Coffee' && roast) {
    filtered = [];
  } else {
    if (brewing) {
      filtered = filtered.filter(p => p.brewingTechnique === brewing);
    }
    if (roast) {
      filtered = filtered.filter(p => p.roastColor === roast);
    }
  }

  filteredProducts = filtered;
  currentPage = 1;
  renderPage();
  renderFilterChips();
}

function renderPage() {
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const pageItems = filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  renderProducts(pageItems);
  renderPagination();
}

function renderPagination() {
  let pagContainer = document.getElementById('pagination');
  if (!pagContainer) {
    pagContainer = document.createElement('div');
    pagContainer.id = 'pagination';
    pagContainer.className = 'pagination';
    document.getElementById('products').after(pagContainer);
  }

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  if (totalPages <= 1) {
    pagContainer.innerHTML = '';
    return;
  }

  let html = `<button class="pag-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">&laquo; Prev</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="pag-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }
  html += `<button class="pag-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">Next &raquo;</button>`;
  pagContainer.innerHTML = html;

  pagContainer.querySelectorAll('.pag-btn').forEach(btn => {
    btn.onclick = function() {
      const page = parseInt(this.getAttribute('data-page'));
      if (page && page >= 1 && page <= totalPages) {
        currentPage = page;
        renderPage();
        window.scrollTo({ top: 200, behavior: 'smooth' });
      }
    };
  });
}

function renderProducts(products) {
  const container = document.getElementById('products');
  const noProducts = document.getElementById('no-products');

  if (!products.length) {
    container.innerHTML = '';
    container.style.display = 'none';
    noProducts.style.display = 'block';
    return;
  }

  noProducts.style.display = 'none';
  container.style.display = 'grid';

  container.innerHTML = products.map(product => `
    <div class="product">
      <div class="product-img"><img src="${product.image}" alt="${product.name}"></div>
      <div class="product-body">
        <span class="product-badge">${product.brewingTechnique}${product.roastColor ? ' &middot; ' + product.roastColor + ' Roast' : ''}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-footer">
          <span class="price" data-price-egp="${product.price}">${product.price} EGP</span>
          <button class="btn-add" data-name="${product.name}" data-price="${product.price}" data-i18n="addToCart">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.btn-add').forEach(button => {
    button.onclick = function() {
      const name = this.getAttribute('data-name');
      const price = this.getAttribute('data-price');
      if (window.addToCartHandler) window.addToCartHandler(name, price);
      showToast('Added to cart!');
    };
  });

  if (window.updateAllPrices) window.updateAllPrices();
  if (typeof applyTranslations === 'function') applyTranslations();
}

function renderFilterChips() {
  const chipsContainer = document.getElementById('filter-chips');
  const brewing = activeFilters.brewingTechnique;
  const roast = activeFilters.roastColor;

  if (!brewing && !roast) {
    chipsContainer.style.display = 'none';
    return;
  }

  chipsContainer.style.display = 'flex';

  let chipsHTML = '<button class="chip-reset" id="reset-all-btn">Reset all</button>';

  if (brewing) {
    chipsHTML += `<span class="filter-chip">${brewing} <button class="chip-remove" data-filter="brewingTechnique">&times;</button></span>`;
  }
  if (roast) {
    chipsHTML += `<span class="filter-chip">${roast} <button class="chip-remove" data-filter="roastColor">&times;</button></span>`;
  }

  chipsContainer.innerHTML = chipsHTML;

  document.getElementById('reset-all-btn').onclick = resetAllFilters;

  document.querySelectorAll('.chip-remove').forEach(btn => {
    btn.onclick = function() {
      const filterKey = this.getAttribute('data-filter');
      activeFilters[filterKey] = '';
      if (filterKey === 'brewingTechnique') {
        document.getElementById('filter-brewing').value = '';
      }
      if (filterKey === 'roastColor') {
        document.getElementById('filter-roast').value = '';
      }
      applyFilters();
    };
  });
}

function resetAllFilters() {
  activeFilters.brewingTechnique = '';
  activeFilters.roastColor = '';
  document.getElementById('filter-brewing').value = '';
  document.getElementById('filter-roast').value = '';
  applyFilters();
}

function showToast(text) {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.className = 'toast-message toast-success';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  fetchProducts();

  document.getElementById('filter-brewing').addEventListener('change', function() {
    activeFilters.brewingTechnique = this.value;
    applyFilters();
  });

  document.getElementById('filter-roast').addEventListener('change', function() {
    activeFilters.roastColor = this.value;
    applyFilters();
  });

  document.getElementById('return-shop-btn').addEventListener('click', resetAllFilters);
});
