class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.themeIcon = document.getElementById('themeIcon');
    this.setInitialTheme();
    this.registerEvents();
  }

  setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      if (this.themeIcon) {
        this.themeIcon.classList.remove('fa-moon');
        this.themeIcon.classList.add('fa-sun');
      }
    }
  }

  registerEvents() {
    if (!this.themeToggle) return;
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (!this.themeIcon) return;
    if (isDark) {
      this.themeIcon.classList.remove('fa-moon');
      this.themeIcon.classList.add('fa-sun');
    } else {
      this.themeIcon.classList.remove('fa-sun');
      this.themeIcon.classList.add('fa-moon');
    }
  }
}

class Preloader {
  constructor() {
    this.preloader = document.getElementById('preloader');
    if (!this.preloader) return;
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.preloader.style.opacity = '0';
        setTimeout(() => {
          this.preloader.style.display = 'none';
        }, 700);
      }, 800);
    });
  }
}

class MobileMenu {
  constructor() {
    this.menuBtn = document.getElementById('mobileMenuBtn');
    this.mobileMenu = document.getElementById('mobileMenu');
    this.registerEvents();
  }

  registerEvents() {
    if (!this.menuBtn || !this.mobileMenu) return;
    this.menuBtn.addEventListener('click', () => {
      this.mobileMenu.classList.toggle('hidden');
    });

    this.mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => this.mobileMenu.classList.add('hidden'));
    });
  }
}

class BackToTop {
  constructor() {
    this.button = document.getElementById('backToTop');
    if (!this.button) return;
    window.addEventListener('scroll', () => this.handleScroll());
    this.button.addEventListener('click', () => this.scrollTop());
  }

  handleScroll() {
    if (window.pageYOffset > 300) {
      this.button.classList.remove('hidden');
    } else {
      this.button.classList.add('hidden');
    }
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

class NotificationSystem {
  constructor() {
    this.notification = document.getElementById('notification');
  }

  show(message, type = 'success', duration = 3000) {
    if (!this.notification) return;
    const baseClass = 'fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-50';
    const typeClass =
      type === 'error'
        ? 'bg-red-500 text-white'
        : type === 'info'
        ? 'bg-blue-500 text-white'
        : 'bg-green-500 text-white';

    this.notification.className = `${baseClass} ${typeClass}`;
    this.notification.textContent = message;
    this.notification.style.display = 'block';

    setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide() {
    if (!this.notification) return;
    this.notification.style.display = 'none';
  }
}

function highlightActiveNav() {
  const activePage = document.body.dataset.page;
  if (!activePage) return;
  document.querySelectorAll('[data-nav]').forEach((link) => {
    const target = link.getAttribute('data-nav');
    if (target === activePage) {
      link.classList.add('text-primaryEnd', 'font-semibold');
    } else {
      link.classList.remove('text-primaryEnd', 'font-semibold');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new Preloader();
  new MobileMenu();
  new BackToTop();
  window.notificationSystem = new NotificationSystem();
  highlightActiveNav();
});
