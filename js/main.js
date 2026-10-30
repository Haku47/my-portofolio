/**
 * ==============================================================================
 * main.js - Script Interaktivitas Portofolio Pribadi
 * Dibangun murni dengan Vanilla JavaScript (ES6+) tanpa framework/library tambahan.
 * 
 * Daftar Fitur & JavaScript Events:
 * 1. Theme Toggle (Click Event & LocalStorage)
 * 2. Mobile Navigation Hamburger Menu (Click Event)
 * 3. Dynamic Time-based Greeting (DOMContentLoaded Event)
 * 4. Project Category Filter & Realtime Search (Click & Input Events)
 * 5. Interactive Project Details Modal (Click & Keydown Escape Events)
 * 6. Contact Form Validation & Realtime Character Counter (Submit & Input Events)
 * 7. Copy Email to Clipboard (Click Event)
 * 8. FAQ Accordion Toggle (Click Event)
 * 9. Scroll to Top Floating Button (Scroll & Click Events)
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================================
   * 1. FITUR TEMA GELAP / TERANG (DARK / LIGHT MODE)
   * Event: Click & LocalStorage
   * ============================================================================ */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeTextEl = document.getElementById('theme-text');
  const body = document.body;

  const updateThemeUI = (isDark) => {
    if (isDark) {
      body.classList.add('dark-mode');
      if (themeTextEl) themeTextEl.textContent = 'Mode Terang';
      if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Ubah ke Mode Terang');
    } else {
      body.classList.remove('dark-mode');
      if (themeTextEl) themeTextEl.textContent = 'Mode Gelap';
      if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Ubah ke Mode Gelap');
    }
  };

  // Baca preferensi tersimpan dari LocalStorage (default dark-mode)
  const savedTheme = localStorage.getItem('alvien_portofolio_theme');
  if (savedTheme === 'light') {
    updateThemeUI(false);
  } else {
    updateThemeUI(true);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const willBeDark = !body.classList.contains('dark-mode');
      updateThemeUI(willBeDark);
      localStorage.setItem('alvien_portofolio_theme', willBeDark ? 'dark' : 'light');
    });
  }

  /* ============================================================================
   * 2. MENU NAVIGASI MOBILE (HAMBURGER)
   * Event: Click
   * ============================================================================ */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Menutup menu mobile saat tautan diklik
    const links = navLinks.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Menutup menu saat klik di luar area navbar
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ============================================================================
   * 3. SALAM DINAMIS SESUAI WAKTU (DYNAMIC GREETING)
   * Event: DOMContentLoaded
   * ============================================================================ */
  const greetingEl = document.getElementById('hero-greeting');
  if (greetingEl) {
    const currentHour = new Date().getHours();
    let greetingText = 'Halo, saya';

    if (currentHour >= 4 && currentHour < 11) {
      greetingText = 'Selamat Pagi ☀️, saya';
    } else if (currentHour >= 11 && currentHour < 15) {
      greetingText = 'Selamat Siang 🌤️, saya';
    } else if (currentHour >= 15 && currentHour < 18) {
      greetingText = 'Selamat Sore 🌇, saya';
    } else {
      greetingText = 'Selamat Malam 🌙, saya';
    }

    greetingEl.textContent = greetingText;
  }

  /* ============================================================================
   * 4. FILTER KATEGORI & PENCARIAN REALTIME PROYEK
   * Event: Click (Filter) & Input (Search)
   * ============================================================================ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectSearchInput = document.getElementById('project-search');
  const noProjectsMessage = document.getElementById('no-projects');

  if (projectCards.length > 0) {
    let activeCategory = 'all';
    let searchQuery = '';

    const applyProjectFilters = () => {
      let visibleCount = 0;

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category') || '';
        const titleEl = card.querySelector('h3');
        const descEl = card.querySelector('p');
        const tagsEl = card.querySelector('.tags');

        const cardText = `${titleEl ? titleEl.textContent : ''} ${descEl ? descEl.textContent : ''} ${tagsEl ? tagsEl.textContent : ''}`.toLowerCase();

        const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
        const matchesSearch = !searchQuery || cardText.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (noProjectsMessage) {
        if (visibleCount === 0) {
          noProjectsMessage.classList.remove('hidden');
        } else {
          noProjectsMessage.classList.add('hidden');
        }
      }
    };

    // Event Click pada tombol kategori
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        activeCategory = e.currentTarget.getAttribute('data-category') || 'all';
        applyProjectFilters();
      });
    });

    // Event Input pada kolom pencarian
    if (projectSearchInput) {
      projectSearchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyProjectFilters();
      });
    }
  }

  /* ============================================================================
   * 5. MODAL DETAIL PROYEK INTERAKTIF
   * Event: Click & Keydown (Escape)
   * ============================================================================ */
  const projectDatabase = {
    wibupedia: {
      title: 'Wibupedia Catalog',
      category: 'Web App',
      description: 'Aplikasi katalog anime berbasis website yang memungkinkan pengguna mencari dan menelusuri data anime terlengkap, jadwal rilis, rating komunitas, hingga sinopsis episode secara instan.',
      features: [
        'Pencarian anime secara instan berdasarkan judul dan genre.',
        'Antarmuka kartu yang responsif di smartphone, tablet, dan desktop.',
        'Penyajian metadata lengkap (Studio, Skor, Status tayang, dan Musim).',
        'Struktur data teroptimasi untuk waktu muat halaman yang cepat.'
      ],
      tags: ['HTML5 Semantik', 'CSS Grid', 'JavaScript ES6+', 'REST API'],
      githubUrl: 'https://github.com/Haku47'
    },
    tanyapalapa: {
      title: 'TanyaPalapa AI',
      category: 'Web App',
      description: 'Antarmuka aplikasi percakapan asisten kecerdasan buatan dengan desain chat interaktif, penyedia pertanyaan instan (prompt presets), dan riwayat interaksi pengguna yang mudah dipahami.',
      features: [
        'Antarmuka obrolan ala percakapan modern dengan gelembung pesan dinamis.',
        'Daftar template prompt pintar untuk inspirasi pertanyaan pengguna.',
        'Dukungan penuh navigasi keyboard dan adaptasi tata letak responsif.',
        'Desain antarmuka gelap yang nyaman untuk penggunaan dalam waktu lama.'
      ],
      tags: ['Vanilla JavaScript', 'CSS Flexbox & Grid', 'UI/UX Design', 'AI Agent Interface'],
      githubUrl: 'https://github.com/Haku47'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCloseAction = document.getElementById('modal-close-action');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalDesc = document.getElementById('modal-description');
  const modalFeatures = document.getElementById('modal-features');
  const modalTags = document.getElementById('modal-tags');
  const modalGithub = document.getElementById('modal-github');

  const openProjectModal = (projectId) => {
    const data = projectDatabase[projectId];
    if (!data || !projectModal) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalBadge) modalBadge.textContent = data.category;
    if (modalDesc) modalDesc.textContent = data.description;

    if (modalFeatures) {
      modalFeatures.innerHTML = '';
      data.features.forEach((feature) => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeatures.appendChild(li);
      });
    }

    if (modalTags) {
      modalTags.innerHTML = '';
      data.tags.forEach((tag) => {
        const span = document.createElement('span');
        span.textContent = tag;
        modalTags.appendChild(span);
      });
    }

    if (modalGithub) {
      modalGithub.href = data.githubUrl || 'https://github.com/Haku47';
    }

    projectModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Kunci scroll latar belakang
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.add('hidden');
    document.body.style.overflow = ''; // Pulihkan scroll
  };

  // Event listener tombol "Detail Proyek"
  const detailButtons = document.querySelectorAll('.btn-detail');
  detailButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const projectId = e.currentTarget.getAttribute('data-project-id');
      if (projectId) {
        openProjectModal(projectId);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalCloseAction) modalCloseAction.addEventListener('click', closeProjectModal);

  // Klik di luar container modal untuk menutup
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Keydown Escape untuk menutup modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && !projectModal.classList.contains('hidden')) {
      closeProjectModal();
    }
  });

  /* ============================================================================
   * 6. FORMULIR KONTAK: VALIDASI & KARAKTER COUNTER
   * Event: Submit, Input, & Timeout
   * ============================================================================ */
  const contactForm = document.getElementById('contact-form');
  const messageInput = document.getElementById('message');
  const charCounter = document.getElementById('char-counter');
  const feedbackEl = document.getElementById('form-feedback');
  let feedbackTimeout = null;

  // Realtime Character Counter
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCounter.textContent = `${len} / 300`;
      if (len >= 280) {
        charCounter.style.color = 'var(--accent-color)';
        charCounter.style.fontWeight = '700';
      } else {
        charCounter.style.color = 'var(--text-muted)';
        charCounter.style.fontWeight = 'normal';
      }
    });
  }

  // Form Submit Handler & Validasi
  if (contactForm && feedbackEl) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (feedbackTimeout) {
        clearTimeout(feedbackTimeout);
      }

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      // Validasi kelengkapan kolom
      if (!nameVal || !emailVal || !messageVal) {
        feedbackEl.textContent = 'Harap lengkapi semua kolom formulir sebelum mengirim pesan.';
        feedbackEl.className = 'form-feedback error';
        return;
      }

      // Validasi panjang nama
      if (nameVal.length < 3) {
        feedbackEl.textContent = 'Nama lengkap minimal harus terdiri dari 3 karakter.';
        feedbackEl.className = 'form-feedback error';
        return;
      }

      // Validasi format email dengan Regex standar
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        feedbackEl.textContent = 'Format alamat email yang Anda masukkan tidak valid.';
        feedbackEl.className = 'form-feedback error';
        return;
      }

      // Validasi panjang pesan
      if (messageVal.length < 10) {
        feedbackEl.textContent = 'Pesan Anda terlalu singkat. Minimal tuliskan 10 karakter.';
        feedbackEl.className = 'form-feedback error';
        return;
      }

      // Sukses pengiriman (Simulasi)
      feedbackEl.textContent = `Terima kasih banyak, ${nameVal}! Pesan Anda telah berhasil terkirim. Saya akan segera menghubungi Anda kembali.`;
      feedbackEl.className = 'form-feedback success';

      contactForm.reset();
      if (charCounter) charCounter.textContent = '0 / 300';

      // Sembunyikan notifikasi setelah 6 detik
      feedbackTimeout = setTimeout(() => {
        feedbackEl.textContent = '';
        feedbackEl.className = 'form-feedback';
      }, 6000);
    });
  }

  /* ============================================================================
   * 7. FITUR SALIN ALAMAT EMAIL KE CLIPBOARD
   * Event: Click
   * ============================================================================ */
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const copyBtnLabel = document.getElementById('copy-btn-label');
  const emailAddressEl = document.getElementById('email-address');

  if (btnCopyEmail && emailAddressEl) {
    btnCopyEmail.addEventListener('click', () => {
      const emailToCopy = emailAddressEl.textContent.trim();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailToCopy).then(() => {
          btnCopyEmail.classList.add('copied');
          if (copyBtnLabel) copyBtnLabel.textContent = '✓ Tersalin!';

          setTimeout(() => {
            btnCopyEmail.classList.remove('copied');
            if (copyBtnLabel) copyBtnLabel.textContent = 'Salin';
          }, 2500);
        }).catch(() => {
          // Fallback jika API clipboard diblokir
          prompt('Salin email secara manual:', emailToCopy);
        });
      } else {
        prompt('Salin email secara manual:', emailToCopy);
      }
    });
  }

  /* ============================================================================
   * 8. FAQ ACCORDION (INTERAKTIF BUKA / TUTUP)
   * Event: Click
   * ============================================================================ */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');

      // Tutup accordion lain untuk kerapian tampilan
      document.querySelectorAll('.accordion-item').forEach((otherItem) => {
        otherItem.classList.remove('active');
        const otherHeader = otherItem.querySelector('.accordion-header');
        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
      });

      // Buka/tutup accordion yang diklik
      if (!isOpen) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ============================================================================
   * 9. TOMBOL KEMBALI KE ATAS (SCROLL TO TOP)
   * Event: Window Scroll & Click
   * ============================================================================ */
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
