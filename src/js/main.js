// کلاس تایپ‌رایتر برای نمایش متن پویا
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // مشخص کردن ایندکس کلمه فعلی
    const current = this.wordIndex % this.words.length;
    // گرفتن مقدار کلمه فعلی
    const fullTxt = this.words[current];

    // چک کردن وضعیت تایپ
    if (this.isDeleting) {
      // حذف کاراکتر
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // اضافه کردن کاراکتر
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // اضافه کردن متن به المنت
    this.txtElement.innerHTML = `<span class="wrap">${this.txt}</span>`;

    // سرعت نوشتار (سریع برای حذف، کند برای نوشتن)
    let typeSpeed = 150;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // اگر کلمه کامل نوشته شد
    if (!this.isDeleting && this.txt === fullTxt) {
      // ایجاد مکث
      typeSpeed = this.wait;
      // تغییر وضعیت به حذف
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // تغییر کلمه
      this.wordIndex++;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// کلاس شمارنده‌های انیمیشنی
class AnimatedCounters {
  constructor() {
    this.counters = document.querySelectorAll('.counter');
    this.start = false;
    this.init();
  }

  init() {
    // زمانی که صفحه اسکرول می‌شود
    window.addEventListener('scroll', () => {
      if (!this.start) {
        const countersPos = this.counters[0].getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.1;

        if (countersPos < screenPos) {
          this.start = true;
          this.countUp();
        }
      }
    });
  }

  countUp() {
    this.counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        // سرعت افزایش
        const inc = target / 200;

        if (count < target) {
          counter.innerHTML = Math.ceil(count + inc);
          setTimeout(updateCount, 10);
        } else {
          counter.innerHTML = target;
        }
      };
      updateCount();
    });
  }
}

// کلاس مدیریت تم تاریک
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.themeIcon = document.getElementById('themeIcon');
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    
    this.themeToggle.addEventListener('click', () => {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      this.setTheme(this.currentTheme);
      localStorage.setItem('theme', this.currentTheme);
    });
  }

  setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      this.themeIcon.className = 'fa-solid fa-sun text-yellow-300';
    } else {
      document.documentElement.classList.remove('dark');
      this.themeIcon.className = 'fa-solid fa-moon text-textDark';
    }
  }
}

// کلاس مدیریت منوی موبایل
class MobileMenu {
  constructor() {
    this.menuBtn = document.getElementById('mobileMenuBtn');
    this.menu = document.getElementById('mobileMenu');
    this.init();
  }

  init() {
    this.menuBtn.addEventListener('click', () => {
      this.menu.classList.toggle('hidden');
      this.menu.classList.toggle('scale-95');
      this.menu.classList.toggle('opacity-0');
      
      // تغییر آیکون منو
      const icon = this.menuBtn.querySelector('i');
      if (this.menu.classList.contains('hidden')) {
        icon.className = 'fa-solid fa-bars';
      } else {
        icon.className = 'fa-solid fa-times';
      }
    });
  }
}

// کلاس مدیریت فرم تماس
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // اعتبارسنجی ساده
      if (name && email && message) {
        // در حالت واقعی، اینجا باید درخواست به سرور ارسال شود
        alert('پیام شما با موفقیت ارسال شد! ممنون از تماس شما.');
        this.form.reset();
      } else {
        alert('لطفاً تمامی فیلدها را پر کنید.');
      }
    });
  }
}

// کلاس مدیریت اسکرول
class ScrollManager {
  constructor() {
    this.nav = document.querySelector('nav');
    this.sections = document.querySelectorAll('section');
    this.navLinks = document.querySelectorAll('nav a');
    this.init();
  }

  init() {
    // اسکرول به بخش‌ها
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      });
    });

    // تغییر لینک فعال در اسکرول
    window.addEventListener('scroll', () => {
      let current = '';
      this.sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });

      this.navLinks.forEach(link => {
        link.classList.remove('text-primaryEnd');
        if (link.getAttribute('href').substring(1) === current) {
          link.classList.add('text-primaryEnd');
        }
      });
    });
  }
}

// کلاس مدیریت کرسر سفارشی
class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('.custom-cursor');
    this.cursorDot = document.querySelector('.cursor-dot');
    this.init();
  }

  init() {
    // اگر دستگاه تاچ باشد، کرسر را مخفی می‌کنیم
    if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
      this.cursor.style.display = 'none';
      this.cursorDot.style.display = 'none';
      return;
    }

    document.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;

      this.cursor.style.left = `${x}px`;
      this.cursor.style.top = `${y}px`;

      // تاخیر برای افکت مغناطیسی
      setTimeout(() => {
        this.cursorDot.style.left = `${x}px`;
        this.cursorDot.style.top = `${y}px`;
      }, 50);

      // افکت مغناطیسی روی دکمه‌ها
      const magneticElements = document.querySelectorAll('.magnetic-btn');
      magneticElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elemLeft = rect.left + document.body.scrollLeft;
        const elemTop = rect.top + document.body.scrollTop;
        const elemWidth = rect.width;
        const elemHeight = rect.height;

        if (x >= elemLeft && x <= (elemLeft + elemWidth) && y >= elemTop && y <= (elemTop + elemHeight)) {
          const moveX = (x - elemLeft - elemWidth / 2) * 0.2;
          const moveY = (y - elemTop - elemHeight / 2) * 0.2;
          element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          element.style.transform = '';
        }
      });
    });

    // حذف ترانس فورم در حالت موبایل
    document.addEventListener('touchstart', () => {
      const magneticElements = document.querySelectorAll('.magnetic-btn');
      magneticElements.forEach(element => {
        element.style.transform = '';
      });
    });
  }
}

// کلاس مدیریت بارگذاری اولیه
class Preloader {
  constructor() {
    this.preloader = document.getElementById('preloader');
    this.init();
  }

  init() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.preloader.style.opacity = '0';
        setTimeout(() => {
          this.preloader.style.display = 'none';
        }, 500);
      }, 1000);
    });
  }
}

// کلاس مدیریت نوار مهارت‌ها
class SkillBars {
  constructor() {
    this.skillBars = document.querySelectorAll('.skill-bar');
    this.init();
  }

  init() {
    const animateBars = () => {
      this.skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-target');
        const currentWidth = bar.style.width;
        
        if (!currentWidth || currentWidth === '0%') {
          bar.style.width = targetWidth;
        }
      });
    };

    // زمانی که صفحه اسکرول می‌شود
    window.addEventListener('scroll', () => {
      const barsPos = this.skillBars[0].getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.1;

      if (barsPos < screenPos) {
        animateBars();
      }
    });
  }
}

// کلاس مدیریت زبان
class LanguageManager {
  constructor() {
    this.languageSwitch = document.getElementById('languageSwitch');
    this.currentLanguage = localStorage.getItem('language') || 'fa';
    this.init();
  }

  init() {
    this.languageSwitch.value = this.currentLanguage;
    
    this.languageSwitch.addEventListener('change', (e) => {
      this.currentLanguage = e.target.value;
      localStorage.setItem('language', this.currentLanguage);
      this.applyLanguage(this.currentLanguage);
    });
  }

  applyLanguage(lang) {
    if (lang === 'en') {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.lang = 'en';
    } else {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.lang = 'fa';
    }
  }
}

// کلاس مدیریت افکت‌های ذره‌ای
class ParticleEffects {
  constructor() {
    this.container = document.querySelector('.floating-shapes-container');
    this.init();
  }

  init() {
    // ایجاد ذرات پویا برای افکت بصری
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.width = `${Math.random() * 10 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      
      document.body.appendChild(particle);
      
      // حذف ذره بعد از مدت زمانی
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 10000);
    }
  }
}

// کلاس اصلی اپلیکیشن
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    // راه‌اندازی تمام ماژول‌ها
    new ThemeManager();
    new MobileMenu();
    new ContactForm();
    new ScrollManager();
    new CustomCursor();
    new Preloader();
    new SkillBars();
    new LanguageManager();
    new ParticleEffects();
    
    // راه‌اندازی شمارنده‌های انیمیشنی
    setTimeout(() => {
      new AnimatedCounters();
    }, 1000);
    
    // راه‌اندازی تایپ‌رایتر
    setTimeout(() => {
      new TypeWriter(document.getElementById('typewriter'), ['سلام! من رضا هستم']);
    }, 1500);
  }
}

// راه‌اندازی اپلیکیشن وقتی DOM آماده است
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// مدیریت کلیک روی لینک‌های دانلود
document.getElementById('downloadResume')?.addEventListener('click', () => {
  // در حالت واقعی، اینجا فایل رزومه دانلود می‌شود
  alert('در حال حاضر امکان دانلود رزومه وجود ندارد، لطفاً از طریق تماس با من اقدام کنید.');
});

// مدیریت کلیک روی دکمه گیت‌هاب
document.getElementById('viewGithub')?.addEventListener('click', () => {
  window.open('https://github.com/rezaismaili', '_blank');
});