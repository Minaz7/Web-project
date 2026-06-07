async function handleSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const error = document.getElementById('error');

  if (!name || !email || !message) {
    error.className = 'error-message';
    error.textContent = 'Please fill in all fields before sending.';
    return;
  }

  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    error.className = 'error-message';
    error.textContent = 'Name cannot contain numbers.';
    return;
  }

  const emailParts = email.split('@');
  if (emailParts.length !== 2) {
    error.className = 'error-message';
    error.textContent = 'Please enter a valid email address with @ symbol.';
    return;
  }

  const domain = emailParts[1];
  if (!domain.match(/\.(com|net|org|edu\.eg)$/)) {
    error.className = 'error-message';
    error.textContent = 'Email must end with .com, .net, .org, or .edu.eg';
    return;
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Could not send message.');

    error.className = 'success-message';
    error.textContent = 'Message sent and saved successfully.';
    document.getElementById('contactForm').reset();
  } catch (err) {
    error.className = 'error-message';
    error.textContent = err.message;
  }
}

function showMessage(text, isError = false) {
  const error = document.getElementById('error');
  if (error) {
    error.className = isError ? 'error-message' : 'success-message';
    error.textContent = text;
    setTimeout(() => {
      if (error.textContent === text) error.textContent = '';
    }, 3000);
  } else {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.className = `toast-message ${isError ? 'toast-error' : 'toast-success'}`;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  const addButtons = document.querySelectorAll('.btn-add');
  addButtons.forEach(button => {
    button.onclick = function() {
      const name = this.getAttribute('data-name');
      const price = this.getAttribute('data-price');
      if (window.addToCartHandler) window.addToCartHandler(name, price);
      showMessage('Added to cart!');
    };
  });

  const shopButtons = document.querySelectorAll('.btn-outline');
  shopButtons.forEach(button => {
    button.onclick = function() {
      window.location.href = '/shop';
    };
  });

  // Load featured products on homepage
  const featuredGrid = document.getElementById('featured-products');
  if (featuredGrid) {
    loadFeaturedProducts(featuredGrid);
  }

  function checkVisibility() {
    const elements = document.querySelectorAll('.story-text, .story-image, .featured');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility();
});

async function loadFeaturedProducts(container) {
  try {
    const response = await fetch('/api/products');
    const products = await response.json();
    const featured = products.slice(0, 3);

    container.innerHTML = featured.map(product => `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span class="price" data-price-egp="${product.price}">${product.price} EGP</span>
        <button class="btn-outline">Shop now &rarr;</button>
      </div>
    `).join('');

    container.querySelectorAll('.btn-outline').forEach(button => {
      button.onclick = function() {
        window.location.href = '/shop';
      };
    });

    if (window.updateAllPrices) window.updateAllPrices();
  } catch (error) {
    container.innerHTML = '<p>Could not load featured products.</p>';
  }
}
