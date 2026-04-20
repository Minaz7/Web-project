function handleSubmit(e) {
  e.preventDefault();
  
  // Get values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  
  const error = document.getElementById('error');
  if (!name || !email || !message) {
    error.style.color = '#c0392b';
    error.textContent = 'Please fill in all fields before sending.';
    return;
  }
  const nameRegex = /^[a-zA-Z0-9\s]+$/;
  if (!nameRegex.test(name)) {
    showMessage('Name only contains letters and numbers.', true); 
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.style.color = '#c0392b';
    error.textContent = 'Please enter a valid email address.';
    return;
  }

  error.style.color = '#2e7d32';
  error.textContent = '✓ Message sent! We\'ll get back to you shortly.';
  document.getElementById('contactForm').reset();
}

let cartCount = 0;

function showMessage(text, isError = false) {
  const error = document.getElementById('error');
  if (error) {
    error.style.color = isError ? '#c0392b' : '#2e7d32';
    error.textContent = text;
    setTimeout(() => {
      if (error.textContent === text) error.textContent = '';
    }, 3000);
  } else {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.position = 'fixed';
    msg.style.bottom = '20px';
    msg.style.right = '20px';
    msg.style.backgroundColor = isError ? '#c0392b' : '#2e7d32';
    msg.style.color = 'white';
    msg.style.padding = '12px 24px';
    msg.style.borderRadius = '8px';
    msg.style.fontSize = '0.85rem';
    msg.style.zIndex = '9999';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Contact form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  // Add to Cart buttons
  const addButtons = document.querySelectorAll('.btn-add');
  addButtons.forEach(button => {
    button.addEventListener('click', function() {
      cartCount++;
      const cartCountSpan = document.querySelector('.cart-count');
      if (cartCountSpan) cartCountSpan.textContent = cartCount;
      showMessage('✓ Added to cart!');
    });
  });

  // Shop now buttons (homepage)
  const shopButtons = document.querySelectorAll('.btn-outline');
  shopButtons.forEach(button => {
    button.addEventListener('click', function() {
      window.location.href = 'shop.html';
    });
  });

  // Cart icon click
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', function() {
      if (cartCount === 0) {
        showMessage('Your cart is empty. Add some coffee first!', true);
      } else {
        showMessage(`You have ${cartCount} item(s) in your cart. Checkout coming soon!`);
      }
    });
  }

  // Scroll animation
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

