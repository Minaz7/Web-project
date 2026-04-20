// ─── Cart State ───────────────────────────────────────────────
let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

function saveCart() {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

// ─── Update cart count badge + checkout button ────────────────
function updateCartUI() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);

  // Update all cart count badges on the page
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
  });

  // Show/hide checkout button (only exists on shop page)
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.style.display = total > 0 ? 'inline-block' : 'none';
  }
}

// ─── Add to cart ──────────────────────────────────────────────
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  updateCartUI();

  // Brief visual feedback on the button
  const btns = document.querySelectorAll('.btn-add');
  btns.forEach(btn => {
    if (btn.dataset.name === name) {
      btn.textContent = '✓ Added';
      btn.style.background = '#4a7c59';
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
      }, 1000);
    }
  });
}

// ─── Bind Add to Cart buttons ─────────────────────────────────
function bindAddButtons() {
  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const name  = btn.dataset.name;
      const price = btn.dataset.price;
      addToCart(name, price);
    });
  });
}

// ─── Checkout page: render order summary ─────────────────────
function renderCheckout() {
  const summary = document.getElementById('order-summary');
  const totalEl = document.getElementById('order-total');
  if (!summary) return;

  if (cart.length === 0) {
    summary.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="shop.html">Go back to shop</a></p>';
    if (totalEl) totalEl.textContent = '0 EGP';
    return;
  }

  summary.innerHTML = cart.map(item => `
    <div class="order-item">
      <div class="order-item-info">
        <span class="order-item-name">${item.name}</span>
        <span class="order-item-qty">x${item.qty}</span>
      </div>
      <span class="order-item-price">${(parseInt(item.price) * item.qty).toLocaleString()} EGP</span>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + parseInt(item.price) * item.qty, 0);
  if (totalEl) totalEl.textContent = total.toLocaleString() + ' EGP';
}

// ─── Checkout form submission ─────────────────────────────────
function bindCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const fullname = document.getElementById('fullname').value.trim();
    const email    = document.getElementById('co-email').value.trim();
    const address  = document.getElementById('address').value.trim();
    const card     = document.getElementById('card').value.trim();
    const errorEl  = document.getElementById('co-error');

    if (!fullname || !email || !address || !card) {
      errorEl.style.color = '#c0392b';
      errorEl.textContent = 'Please fill in all fields.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorEl.style.color = '#c0392b';
      errorEl.textContent = 'Please enter a valid email address.';
      return;
    }
    if (!/^\d{16}$/.test(card.replace(/\s/g, ''))) {
      errorEl.style.color = '#c0392b';
      errorEl.textContent = 'Please enter a valid 16-digit card number.';
      return;
    }

    // Clear cart and show success
    cart = [];
    saveCart();
    document.getElementById('checkout-wrap').style.display = 'none';
    document.getElementById('order-success').style.display = 'block';
  });
}

// ─── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  bindAddButtons();
  renderCheckout();
  bindCheckoutForm();
});