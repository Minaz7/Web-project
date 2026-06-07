let editingProductId = null;

async function apiRequest(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...authHeaders(),
    ...(options.headers || {})
  };

  const response = await fetch(url, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }

  return data;
}

async function loadAdminProducts() {
  const list = document.getElementById('admin-products-list');

  list.innerHTML = '<p class="loading-text">Loading products...</p>';

  try {
    const products = await apiRequest('/api/products');

    if (!products.length) {
      list.innerHTML = '<p>No coffee products yet.</p>';
      return;
    }

    list.innerHTML = products.map(product => `
      <div class="admin-row">
        <img src="${product.image || '/images/products/default.jpg'}" alt="${product.name}">
        <div>
          <strong>${product.name}</strong>
          <p>${product.description}</p>
          <small>${product.brewingTechnique || ''} &middot; ${product.roastColor || 'N/A'} &middot; ${product.price} EGP &middot; Stock: ${product.stock}</small>
        </div>
        <div class="admin-actions">
          <button type="button" onclick='fillProductForm(${JSON.stringify(product)})'>Edit</button>
          <button type="button" class="danger" onclick="deleteProduct('${product._id}')">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    list.innerHTML = `<p class="error-message">${error.message}</p>`;
  }
}

function fillProductForm(product) {
  editingProductId = product._id;

  document.getElementById('product-name').value = product.name || '';
  document.getElementById('product-price').value = product.price || '';
  document.getElementById('product-brewing').value = product.brewingTechnique || '';
  document.getElementById('product-roast').value = product.roastColor || '';
  document.getElementById('product-image').value = product.image || '/images/products/default.jpg';
  document.getElementById('image-preview').src = product.image || '/images/products/default.jpg';
  document.getElementById('product-image-file').value = '';
  document.getElementById('product-stock').value = product.stock || 0;
  document.getElementById('product-description').value = product.description || '';
  document.getElementById('product-submit').textContent = 'Update Coffee';

  toggleRoastColor();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetProductForm() {
  editingProductId = null;

  document.getElementById('productForm').reset();
  document.getElementById('product-image').value = '/images/products/default.jpg';
  document.getElementById('image-preview').src = '/images/products/default.jpg';
  document.getElementById('product-submit').textContent = 'Add Coffee';
  document.getElementById('admin-message').textContent = '';
  toggleRoastColor();
}

function toggleRoastColor() {
  const brewing = document.getElementById('product-brewing').value;
  const roastGroup = document.getElementById('roast-color-group');
  if (brewing === 'Espresso Coffee') {
    roastGroup.style.display = 'none';
    document.getElementById('product-roast').value = '';
  } else {
    roastGroup.style.display = 'block';
  }
}

async function deleteProduct(id) {
  if (!confirm('Delete this coffee product?')) {
    return;
  }

  try {
    await apiRequest(`/api/products/${id}`, { method: 'DELETE' });
    await loadAdminProducts();
  } catch (error) {
    const message = document.getElementById('admin-message');
    message.className = 'error-message';
    message.textContent = error.message;
  }
}

async function loadOrders() {
  const list = document.getElementById('orders-list');

  try {
    const orders = await apiRequest('/api/orders');

    if (!orders.length) {
      list.innerHTML = '<p>No orders yet.</p>';
      return;
    }

    list.innerHTML = orders.map(order => `
      <div class="admin-card-small">
        <strong>Order #${order._id.slice(-6)}</strong>
        <p>${order.customerName} &middot; ${order.total} EGP &middot; ${order.status}</p>
        <small>${order.items.map(item => `${item.name} x${item.qty}`).join(', ')}</small>
      </div>
    `).join('');
  } catch (error) {
    list.innerHTML = `<p class="error-message">${error.message}</p>`;
  }
}

async function loadMessages() {
  const list = document.getElementById('messages-list');

  try {
    const messages = await apiRequest('/api/messages');

    if (!messages.length) {
      list.innerHTML = '<p>No contact messages yet.</p>';
      return;
    }

    list.innerHTML = messages.map(message => `
      <div class="admin-card-small">
        <strong>${message.name}</strong>
        <p>${message.message}</p>
        <small>${message.email}</small>
      </div>
    `).join('');
  } catch (error) {
    list.innerHTML = `<p class="error-message">${error.message}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (!protectPage('admin')) {
    return;
  }

  loadAdminProducts();
  loadOrders();
  loadMessages();

  document.getElementById('product-brewing').addEventListener('change', toggleRoastColor);
  toggleRoastColor();

  const imageFileInput = document.getElementById('product-image-file');
  if (imageFileInput) {
    imageFileInput.addEventListener('change', async function () {
      const file = this.files[0];
      if (!file) return;

      const message = document.getElementById('admin-message');
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('/api/products/upload-image', {
          method: 'POST',
          headers: { ...authHeaders() },
          body: formData
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Upload failed.');

        document.getElementById('product-image').value = data.imagePath;
        document.getElementById('image-preview').src = data.imagePath;
        message.className = 'success-message';
        message.textContent = 'Image uploaded.';
      } catch (error) {
        message.className = 'error-message';
        message.textContent = error.message;
      }
    });
  }

  document.getElementById('cancel-edit').onclick = resetProductForm;

  document.getElementById('productForm').onsubmit = async function (e) {
    e.preventDefault();

    const message = document.getElementById('admin-message');

    const product = {
      name: document.getElementById('product-name').value.trim(),
      price: Number(document.getElementById('product-price').value),
      brewingTechnique: document.getElementById('product-brewing').value,
      roastColor: document.getElementById('product-roast').value,
      image: document.getElementById('product-image').value.trim() || '/images/products/default.jpg',
      stock: Number(document.getElementById('product-stock').value),
      description: document.getElementById('product-description').value.trim()
    };

    try {
      const url = editingProductId ? `/api/products/${editingProductId}` : '/api/products';
      const method = editingProductId ? 'PUT' : 'POST';

      await apiRequest(url, {
        method,
        body: JSON.stringify(product)
      });

      message.className = 'success-message';
      message.textContent = editingProductId ? 'Coffee updated successfully.' : 'Coffee added successfully.';

      resetProductForm();
      await loadAdminProducts();
    } catch (error) {
      message.className = 'error-message';
      message.textContent = error.message;
    }
  };
});
