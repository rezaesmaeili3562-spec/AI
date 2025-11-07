(function () {
  const html = document.documentElement;
  const preloader = document.getElementById('preloader');
  const themeToggle = document.getElementById('themeToggle');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const backToTop = document.getElementById('backToTop');
  const downloadResume = document.getElementById('downloadResume');
  const viewGithub = document.getElementById('viewGithub');
  const languageSwitch = document.getElementById('languageSwitch');

  // Preloader
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 600);
      }, 800);
    });
  }

  // Custom cursor
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  if (cursor && cursorDot) {
    document.addEventListener('mousemove', (event) => {
      const { clientX, clientY } = event;
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      cursorDot.style.left = `${clientX}px`;
      cursorDot.style.top = `${clientY}px`;
    });

    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    magneticButtons.forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.4)';
        cursor.style.background = 'rgba(139, 92, 246, 0.2)';
      });
      btn.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'transparent';
      });
    });
  }

  // Theme handling
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  const applyTheme = (mode) => {
    if (mode === 'dark') {
      html.classList.add('dark');
      if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
    } else {
      html.classList.remove('dark');
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  };

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      applyTheme(isDark ? 'dark' : 'light');
    });
  }

  // Mobile menu
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.dataset.open === 'true';
      if (isOpen) {
        mobileMenu.style.maxHeight = '0px';
        mobileMenu.dataset.open = 'false';
        setTimeout(() => {
          mobileMenu.style.display = 'none';
        }, 200);
      } else {
        mobileMenu.style.display = 'flex';
        requestAnimationFrame(() => {
          mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        });
        mobileMenu.dataset.open = 'true';
      }
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.style.maxHeight = '0px';
        mobileMenu.dataset.open = 'false';
        setTimeout(() => {
          mobileMenu.style.display = 'none';
        }, 200);
      });
    });
  }

  // Back to top button
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  class NotificationSystem {
    constructor(containerId = 'notification') {
      this.container = document.getElementById(containerId);
    }

    show(message, type = 'success', duration = 3000) {
      if (!this.container) return;
      this.container.textContent = message;
      this.container.className = `notification ${type} visible`;
      clearTimeout(this.hideTimeout);
      this.hideTimeout = setTimeout(() => this.hide(), duration);
    }

    hide() {
      if (!this.container) return;
      this.container.classList.remove('visible');
    }
  }

  window.NotificationSystem = NotificationSystem;
  window.appNotification = new NotificationSystem();

  if (downloadResume) {
    downloadResume.addEventListener('click', () => {
      window.appNotification?.show('در حال آماده‌سازی رزومه...', 'success');
      setTimeout(() => {
        const blob = new Blob(['رزومه به زودی در دسترس قرار می‌گیرد.'], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume-sajad-frontend.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        window.appNotification?.show('رزومه با موفقیت آماده شد.', 'success');
      }, 1200);
    });
  }

  if (viewGithub) {
    viewGithub.addEventListener('click', () => {
      window.open('https://github.com/sajad-frontend', '_blank');
      window.appNotification?.show('در حال باز کردن گیت‌هاب...', 'success');
    });
  }

  if (languageSwitch) {
    languageSwitch.addEventListener('change', (event) => {
      window.appNotification?.show(`زبان به ${event.target.value === 'fa' ? 'فارسی' : 'English'} تغییر یافت.`, 'success');
    });
  }
})();
