class ThemeManager {
  constructor(iframe) {
    this.iframe = iframe;
    this.themeToggle = document.getElementById('themeToggle');
    this.themeIcon = document.getElementById('themeIcon');
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      this.enableDarkMode(false);
    } else {
      this.enableLightMode(false);
    }

    this.themeToggle.addEventListener('click', () => this.toggleTheme());

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      if (!localStorage.getItem('theme')) {
        event.matches ? this.enableDarkMode() : this.enableLightMode();
      }
    });
  }

  toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
      this.enableLightMode();
    } else {
      this.enableDarkMode();
    }
  }

  enableDarkMode(updateStorage = true) {
    document.documentElement.classList.add('dark');
    if (updateStorage) {
      localStorage.setItem('theme', 'dark');
    }
    this.themeIcon.classList.replace('fa-moon', 'fa-sun');
    this.postThemeMessage('dark');
  }

  enableLightMode(updateStorage = true) {
    document.documentElement.classList.remove('dark');
    if (updateStorage) {
      localStorage.setItem('theme', 'light');
    }
    this.themeIcon.classList.replace('fa-sun', 'fa-moon');
    this.postThemeMessage('light');
  }

  postThemeMessage(theme) {
    if (this.iframe && this.iframe.contentWindow) {
      this.iframe.contentWindow.postMessage({ type: 'theme-change', theme }, '*');
    }
  }
}

class NotificationSystem {
  constructor(element) {
    this.element = element;
    this.timeout = null;
  }

  show(message, type = 'info', duration = 2500) {
    if (!this.element) return;

    const themeClasses = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white'
    };

    this.element.textContent = message;
    this.element.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-50 transition-all duration-300 ${themeClasses[type] || themeClasses.info}`;
    this.element.classList.remove('hidden');

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.hide(), duration);
  }

  hide() {
    if (!this.element) return;
    this.element.classList.add('hidden');
  }
}

class FrameController {
  constructor(iframe, preloader, navLinks, themeManager) {
    this.iframe = iframe;
    this.preloader = preloader;
    this.navLinks = navLinks;
    this.themeManager = themeManager;
    this.init();
  }

  init() {
    this.navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const page = link.getAttribute('data-page');
        this.loadPage(page);
        this.setActiveLink(page);
      });
    });

    this.iframe.addEventListener('load', () => {
      this.hidePreloader();
      const framePath = this.getFramePath();
      if (framePath) {
        this.setActiveLink(framePath);
      }
      this.themeManager.postThemeMessage(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  loadPage(page) {
    if (!page || !this.iframe) return;
    this.showPreloader();
    this.iframe.src = page;
  }

  showPreloader() {
    if (!this.preloader) return;
    this.preloader.style.display = 'flex';
    requestAnimationFrame(() => {
      this.preloader.style.opacity = '1';
    });
  }

  hidePreloader() {
    if (!this.preloader) return;
    this.preloader.style.opacity = '0';
    setTimeout(() => {
      this.preloader.style.display = 'none';
    }, 700);
  }

  setActiveLink(page) {
    const normalized = page.replace(/^\//, '').replace(/^\.\//, '');
    this.navLinks.forEach((link) => {
      const linkPage = link.getAttribute('data-page');
      if (linkPage === normalized) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    });
  }

  getFramePath() {
    try {
      const url = new URL(this.iframe.contentWindow.location.href);
      const segments = url.pathname.split('/').filter(Boolean);
      const pagesIndex = segments.lastIndexOf('pages');
      if (pagesIndex !== -1) {
        return `pages/${segments.slice(pagesIndex + 1).join('/')}`;
      }
      return segments.length ? segments.join('/') : null;
    } catch (error) {
      return null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('contentFrame');
  const preloader = document.getElementById('preloader');
  const notificationElement = document.getElementById('notification');
  const navLinks = Array.from(document.querySelectorAll('[data-page]'));

  const notificationSystem = new NotificationSystem(notificationElement);
  const themeManager = new ThemeManager(iframe);
  new FrameController(iframe, preloader, navLinks, themeManager);

  const downloadButton = document.getElementById('downloadResume');
  downloadButton?.addEventListener('click', () => {
    notificationSystem.show('در حال دانلود رزومه...', 'info');
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#';
      link.download = 'resume-sajad-frontend.pdf';
      link.click();
      notificationSystem.show('رزومه با موفقیت دانلود شد!', 'success');
    }, 1200);
  });

  const githubButton = document.getElementById('viewGithub');
  githubButton?.addEventListener('click', () => {
    window.open('https://github.com/sajad-frontend', '_blank');
    notificationSystem.show('گیت‌هاب در پنجره جدید باز شد.', 'success');
  });

  window.addEventListener('message', (event) => {
    if (event.data?.type === 'show-notification') {
      notificationSystem.show(event.data.message, event.data.level);
    }
  });
});
