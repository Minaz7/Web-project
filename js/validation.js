function handleSubmit(e) {
  e.preventDefault();
  
  // Get values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  const error = document.getElementById('error');
  if (!name || !email || !message) {
    error.className = 'error-message';
    error.textContent = 'Please fill in all fields before sending.';
    return;
  }

  // name validation
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    showMessage('Name cannot contain numbers.', true); 
    return;
  }

  // email validation
  const emailParts = email.split('@');
  if (emailParts.length !== 2) {
    error.className = 'error-message';
    error.textContent = 'Please enter a valid email address with @ symbol.';
    return;
  }

  const username = emailParts[0];
  const domain = emailParts[1];



  if (!domain.match(/\.(com|net|org|edu\.eg)$/)) {
    error.className = 'error-message';
    error.textContent = 'Email must end with .com, .net, .org, or .edu.eg';
    return;
  }

  error.className = 'success-message';
  error.textContent = '✓ Message sent! We\'ll get back to you shortly.';
  document.getElementById('contactForm').reset();
}

let cartCount = 0;

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
  // contact form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  // add to cart buttons
  const addButtons = document.querySelectorAll('.btn-add');
  addButtons.forEach(button => {
    button.onclick = function() {
      const name = this.getAttribute('data-name');
      const price = this.getAttribute('data-price');
      if (window.addToCartHandler) window.addToCartHandler(name, price);
      showMessage('✓ Added to cart!');
    };
  });

  // shop button redirects to shop
  const shopButtons = document.querySelectorAll('.btn-outline');
  shopButtons.forEach(button => {
    button.onclick = function() {
      window.location.href = 'shop.html';
    };
  });

  // the scroll animation
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
