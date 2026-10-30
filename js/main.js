// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  const updateThemeLabel = (isDark) => {
    const themeTextEl = document.getElementById('theme-text');
    const label = isDark ? 'Mode Terang' : 'Mode Gelap';

    if (themeTextEl) {
      themeTextEl.textContent = label;
    } else if (themeToggleBtn) {
      themeToggleBtn.textContent = label;
    }
  };

  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    updateThemeLabel(false);
  } else {
    body.classList.add('dark-mode');
    updateThemeLabel(true);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDarkMode = body.classList.contains('dark-mode');

      updateThemeLabel(isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
  }

  const filterBtns = document.querySelectorAll('.Filter-btn, .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        const selectedCategory = e.currentTarget.getAttribute('data-category');

        projectCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category');

          if (selectedCategory === 'all' || cardCategory === selectedCategory) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  const contactForm = document.getElementById('contact-form');
  const feedbackEl = document.getElementById('form-feedback');
  let feedbackTimeout = null;

  if (contactForm && feedbackEl) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (feedbackTimeout) {
        clearTimeout(feedbackTimeout);
      }

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      if (!nameVal || !emailVal || !messageVal) {
        feedbackEl.textContent = 'Harap isi seluruh kolom formulir sebelum mengirim.';
        feedbackEl.className = 'form-feedback error';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        feedbackEl.textContent = 'Format alamat email tidak valid.';
        feedbackEl.className = 'form-feedback error';
        return;
      }

      feedbackEl.textContent = `Terima kasih, ${nameVal}! Pesan Anda berhasil dikirim.`;
      feedbackEl.className = 'form-feedback success';

      contactForm.reset();

      feedbackTimeout = setTimeout(() => {
        feedbackEl.textContent = '';
        feedbackEl.className = 'form-feedback';
      }, 5000);
    });
  }
});