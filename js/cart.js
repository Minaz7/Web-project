let cart = JSON.parse(localStorage.getItem('coffeeCart') || '[]');

function updateCartBadges() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
  });
}

window.addToCartHandler = function(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name: name, price: parseInt(price), qty: 1 });
  }
  localStorage.setItem('coffeeCart', JSON.stringify(cart));
  updateCartBadges();
};

document.addEventListener('DOMContentLoaded', function() {
  updateCartBadges();
  
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.onclick = function() {
      window.location.href = 'checkout.html';
    };
  }
});
