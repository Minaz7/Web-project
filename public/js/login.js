document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const messageBox = document.getElementById('auth-message');

  function showMessage(text, type = 'error') {
    if (!messageBox) return;

    messageBox.className = type === 'success' ? 'success-message' : 'error-message';
    messageBox.textContent = text;
  }

  function validateEmail(email) {
    const emailParts = email.split('@');

    if (emailParts.length !== 2) {
      return 'Email must contain one @ symbol.';
    }

    const username = emailParts[0];
    const domain = emailParts[1];

    if (!username || !domain) {
      return 'Email must have text before and after @.';
    }

    if (!domain.match(/\.(com|net|org|edu|edu\.eg)$/)) {
      return 'Email must end with .com, .net, .org, .edu, or .edu.eg';
    }

    return '';
  }

  function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!name) {
      return 'Name is required.';
    }

    if (name.length < 3) {
      return 'Name must be at least 3 characters.';
    }

    if (!nameRegex.test(name)) {
      return 'Name cannot contain numbers or symbols.';
    }

    return '';
  }

  function validateStrongPassword(password) {
    if (!password) {
      return 'Password is required.';
    }

    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }

    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }

    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }

    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number.';
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password)) {
      return 'Password must contain at least one special character.';
    }

    if (/\s/.test(password)) {
      return 'Password cannot contain spaces.';
    }

    return '';
  }

  async function submitAuth(url, body) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || 'Request failed.');
    }

    return data;
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      if (!email || !password) {
        showMessage('Please enter your email and password.');
        return;
      }

      const emailError = validateEmail(email);
      if (emailError) {
        showMessage(emailError);
        return;
      }

      try {
        const data = await submitAuth('/api/auth/login', {
          email,
          password
        });

        localStorage.setItem('mrBeansToken', data.token);
        localStorage.setItem('mrBeansUser', JSON.stringify(data.user));

        showMessage('Login successful. Redirecting...', 'success');

        setTimeout(function () {
          if (data.user.role === 'admin') {
            window.location.href = '/admin';
          } else {
            window.location.href = '/shop';
          }
        }, 500);
      } catch (error) {
        showMessage(error.message);
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      const nameError = validateName(name);
      if (nameError) {
        showMessage(nameError);
        return;
      }

      const emailError = validateEmail(email);
      if (emailError) {
        showMessage(emailError);
        return;
      }

      const passwordError = validateStrongPassword(password);
      if (passwordError) {
        showMessage(passwordError);
        return;
      }

      try {
        const data = await submitAuth('/api/auth/signup', {
          name,
          email,
          password
        });

        localStorage.setItem('mrBeansToken', data.token);
        localStorage.setItem('mrBeansUser', JSON.stringify(data.user));

        showMessage('Account created successfully. Redirecting...', 'success');

        setTimeout(function () {
          window.location.href = '/shop';
        }, 500);
      } catch (error) {
        showMessage(error.message);
      }
    });
  }
});
