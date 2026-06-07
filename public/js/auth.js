function getCurrentUser() {
  const user = localStorage.getItem('mrBeansUser');
  return user ? JSON.parse(user) : null;
}

function getToken() {
  return localStorage.getItem('mrBeansToken');
}

function isLoggedIn() {
  return Boolean(getToken() && getCurrentUser());
}

function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}

function authHeaders() {
  const token = getToken();

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}

function logout() {
  localStorage.removeItem('mrBeansToken');
  localStorage.removeItem('mrBeansUser');
  window.location.href = '/login';
}

function updateNavigation() {
  const nav = document.querySelector('nav');

  if (!nav) {
    return;
  }

  document.querySelectorAll('.dynamic-auth-link').forEach(link => link.remove());

  const user = getCurrentUser();

  if (user) {
    if (user.role === 'admin') {
      nav.insertAdjacentHTML(
        'beforeend',
        `<a href="/admin" class="dynamic-auth-link">Admin</a>`
      );
    }

    nav.insertAdjacentHTML(
      'beforeend',
      `<span class="dynamic-auth-link nav-user">Hello, ${user.name}</span>
       <button class="dynamic-auth-link nav-logout" onclick="logout()">Logout</button>`
    );
  } else {
    nav.insertAdjacentHTML(
      'beforeend',
      `<a href="/login" class="dynamic-auth-link">Login</a>
       <a href="/signup" class="dynamic-auth-link">Sign Up</a>`
    );
  }
}

function protectPage(requiredRole = null) {
  const user = getCurrentUser();

  if (!user || !getToken()) {
    window.location.href = '/login';
    return false;
  }

  if (requiredRole && user.role !== requiredRole) {
    alert('You do not have permission to access this page.');
    window.location.href = '/';
    return false;
  }

  return true;
}

document.addEventListener('DOMContentLoaded', updateNavigation);
