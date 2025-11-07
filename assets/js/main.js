// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 700);
    }, 1000);
});

// ==================== PAGE NAVIGATION ====================
class PageNavigation {
    constructor() {
        this.pages = Array.from(document.querySelectorAll('.page'));
        this.navLinks = Array.from(document.querySelectorAll('.nav-link'));
        this.init();
    }

    init() {
        if (!this.pages.length) return;

        this.navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.showPage(page);
            });
        });

        document.querySelectorAll('.view-projects-btn').forEach((btn) => {
            btn.addEventListener('click', () => this.showPage('projects'));
        });

        document.querySelectorAll('.contact-btn').forEach((btn) => {
            btn.addEventListener('click', () => this.showPage('contact'));
        });
    }

    showPage(pageName) {
        if (!pageName) return;

        this.pages.forEach((page) => page.classList.remove('active'));
        const targetPage = document.getElementById(`${pageName}-page`);

        if (targetPage) {
            targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

// ==================== THEME MANAGEMENT ====================
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.init();
    }

    init() {
        if (!this.themeToggle || !this.themeIcon) return;

        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            this.enableDarkMode();
        }

        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    enableDarkMode() {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        this.themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    enableLightMode() {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        this.themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    toggleTheme() {
        if (!this.themeToggle || !this.themeIcon) return;

        if (document.documentElement.classList.contains('dark')) {
            this.enableLightMode();
        } else {
            this.enableDarkMode();
        }
    }
}

// ==================== BACK TO TOP BUTTON ====================
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.init();
    }

    init() {
        if (!this.button) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.classList.remove('hidden');
            } else {
                this.button.classList.add('hidden');
            }
        });

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    }
}

// ==================== MOBILE MENU ====================
class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobileMenuBtn');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.init();
    }

    init() {
        if (!this.menuBtn || !this.mobileMenu) return;

        this.menuBtn.addEventListener('click', () => this.toggleMenu());

        this.mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        this.mobileMenu.classList.toggle('hidden');
    }

    closeMenu() {
        this.mobileMenu.classList.add('hidden');
    }
}

// ==================== NOTIFICATION SYSTEM ====================
class NotificationSystem {
    constructor() {
        this.notification = document.getElementById('notification');
    }

    show(message, type = 'success', duration = 3000) {
        if (!this.notification) return;

        this.notification.textContent = message;
        const baseClass = 'fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-50';
        const themeClass =
            type === 'success'
                ? 'bg-green-500 text-white'
                : type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white';

        this.notification.className = `${baseClass} ${themeClass}`;
        this.notification.style.display = 'block';

        window.clearTimeout(this.hideTimeout);
        this.hideTimeout = window.setTimeout(() => this.hide(), duration);
    }

    hide() {
        if (!this.notification) return;
        this.notification.style.display = 'none';
    }
}

// ==================== FORM HANDLING ====================
class ContactForm {
    constructor(notificationSystem) {
        this.form = document.getElementById('contactForm');
        this.notificationSystem = notificationSystem;
        this.init();
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        this.notificationSystem?.show('پیام شما با موفقیت ارسال شد!', 'success');
        this.form.reset();
    }
}

// ==================== BUTTON ACTIONS ====================
class ButtonActions {
    constructor(notificationSystem) {
        this.notificationSystem = notificationSystem;
        this.resumeBtn = document.getElementById('downloadResume');
        this.whatsappBtn = document.getElementById('whatsappBtn');
        this.githubBtn = document.getElementById('viewGithub');
        this.init();
    }

    init() {
        if (this.resumeBtn) {
            this.resumeBtn.addEventListener('click', () => {
                this.notificationSystem?.show('در حال دانلود رزومه...', 'success');

                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = '#';
                    link.download = 'resume-reza-esmaeeli.pdf';
                    link.click();
                }, 1000);
            });
        }

        if (this.whatsappBtn) {
            this.whatsappBtn.addEventListener('click', () => {
                window.open('https://wa.me/989123456789', '_blank');
            });
        }

        if (this.githubBtn) {
            this.githubBtn.addEventListener('click', () => {
                window.open('https://github.com/reza-esmaeeli', '_blank');
            });
        }
    }
}

// ==================== INITIALIZE EVERYTHING ====================
document.addEventListener('DOMContentLoaded', () => {
    const navigation = new PageNavigation();
    const themeManager = new ThemeManager();
    const backToTop = new BackToTop();
    const mobileMenu = new MobileMenu();
    const notifications = new NotificationSystem();
    const contactForm = new ContactForm(notifications);
    const actions = new ButtonActions(notifications);

    void navigation;
    void themeManager;
    void backToTop;
    void mobileMenu;
    void contactForm;
    void actions;

    notifications.show('خوش آمدید! نمونه کار من آماده است.', 'success', 3000);

    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');

    if (line1) {
        setTimeout(() => {
            line1.style.animation = 'typing 2s steps(30, end) 0.5s forwards, blink-caret 0.75s step-end infinite';
        }, 500);
    }

    if (line2) {
        setTimeout(() => {
            line2.style.animation = 'typing 2.5s steps(40, end) 3s forwards, blink-caret 0.75s step-end infinite';
        }, 3000);
    }

    if (line3) {
        setTimeout(() => {
            line3.style.animation = 'typing 3s steps(50, end) 6s forwards, blink-caret 0.75s step-end infinite';
        }, 6000);
    }
});
