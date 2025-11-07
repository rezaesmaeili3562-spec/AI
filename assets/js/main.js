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

const SUPPORTED_LANGUAGES = ['fa', 'en'];

const getCurrentLanguage = () => (document.documentElement.lang === 'fa' ? 'fa' : 'en');

const createTypewriterInitializer = () => {
    const sequences = [
        { id: 'line1', animation: 'typing 2s steps(30, end) 0.5s forwards, blink-caret 0.75s step-end infinite', delay: 500 },
        { id: 'line2', animation: 'typing 2.5s steps(40, end) 3s forwards, blink-caret 0.75s step-end infinite', delay: 3000 },
        { id: 'line3', animation: 'typing 3s steps(50, end) 6s forwards, blink-caret 0.75s step-end infinite', delay: 6000 },
    ];

    let timeouts = [];

    return () => {
        timeouts.forEach((timeout) => window.clearTimeout(timeout));
        timeouts = [];

        sequences.forEach(({ id, animation, delay }) => {
            const element = document.getElementById(id);
            if (!element) return;

            element.style.animation = 'none';
            void element.offsetHeight;

            const timeout = window.setTimeout(() => {
                element.style.animation = animation;
            }, delay);

            timeouts.push(timeout);
        });
    };
};

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

        const initialPage = this.pages.find((page) => page.classList.contains('active'));
        if (initialPage?.id) {
            const initialPageName = initialPage.id.replace('-page', '');
            this.updateActiveLink(initialPageName);
        }
    }

    showPage(pageName) {
        if (!pageName) return;

        this.pages.forEach((page) => page.classList.remove('active'));
        const targetPage = document.getElementById(`${pageName}-page`);

        if (targetPage) {
            targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.updateActiveLink(pageName);
        }
    }

    updateActiveLink(pageName) {
        this.navLinks.forEach((link) => {
            const linkPage = link.getAttribute('data-page');
            link.classList.toggle('active', linkPage === pageName);
        });
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
        this.notification.classList.remove('hidden');

        window.clearTimeout(this.hideTimeout);
        this.hideTimeout = window.setTimeout(() => this.hide(), duration);
    }

    hide() {
        if (!this.notification) return;
        this.notification.style.display = 'none';
        this.notification.classList.add('hidden');
    }
}

// ==================== FORM HANDLING ====================
class ContactForm {
    constructor(notificationSystem) {
        this.form = document.getElementById('contactForm');
        this.notificationSystem = notificationSystem;
        this.messages = {
            fa: {
                success: 'پیام شما با موفقیت ارسال شد!',
                error: 'لطفاً تمام فیلدها را به‌صورت صحیح تکمیل کنید.',
            },
            en: {
                success: 'Your message has been sent successfully!',
                error: 'Please complete all fields with valid information.',
            },
        };
        this.init();
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.form) return;

        const formData = new FormData(this.form);
        const values = {
            name: formData.get('name')?.toString().trim() ?? '',
            email: formData.get('email')?.toString().trim() ?? '',
            subject: formData.get('subject')?.toString().trim() ?? '',
            message: formData.get('message')?.toString().trim() ?? '',
        };

        Object.keys(values).forEach((fieldName) => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            field?.classList.remove('input-error');
        });

        const errors = [];
        if (!values.name) errors.push('name');
        if (!values.email || !/^[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+(?:\.[\w-]+)+$/.test(values.email)) errors.push('email');
        if (!values.subject) errors.push('subject');
        if (!values.message) errors.push('message');

        if (errors.length) {
            errors.forEach((fieldName) => {
                const field = this.form.querySelector(`[name="${fieldName}"]`);
                field?.classList.add('input-error');
            });

            const language = getCurrentLanguage();
            const errorMessage = this.messages[language]?.error ?? '';
            this.notificationSystem?.show(errorMessage, 'error', 4000);
            return;
        }

        const language = getCurrentLanguage();
        const successMessage = this.messages[language]?.success ?? '';
        this.notificationSystem?.show(successMessage, 'success');
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
        this.resumePath = 'assets/resume/reza-esmaeeli.pdf';
        this.messages = {
            fa: {
                resumePreparing: 'در حال دانلود رزومه...',
                resumeReady: 'رزومه در تب جدید باز شد.',
            },
            en: {
                resumePreparing: 'Preparing your resume...',
                resumeReady: 'The resume has opened in a new tab.',
            },
        };
        this.init();
    }

    showMessage(key, type = 'success', duration = 3000) {
        const language = getCurrentLanguage();
        const message = this.messages[language]?.[key];
        if (message) {
            this.notificationSystem?.show(message, type, duration);
        }
    }

    init() {
        if (this.resumeBtn) {
            this.resumeBtn.addEventListener('click', () => {
                this.showMessage('resumePreparing', 'success');

                window.setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = this.resumePath;
                    link.target = '_blank';
                    link.rel = 'noopener';
                    link.download = 'resume-reza-esmaeeli.pdf';
                    document.body.appendChild(link);
                    link.click();
                    link.remove();

                    this.showMessage('resumeReady', 'success', 2500);
                }, 800);
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

// ==================== LANGUAGE MANAGER ====================
class LanguageManager {
    constructor(notificationSystem, restartTypewriter) {
        this.notificationSystem = notificationSystem;
        this.restartTypewriter = restartTypewriter;
        this.languageSwitch = document.getElementById('languageSwitch');
        this.currentLanguage = 'fa';
        this.translations = {
            fa: {
                'nav.home': 'خانه',
                'nav.about': 'درباره من',
                'nav.skills': 'مهارت‌ها',
                'nav.projects': 'پروژه‌ها',
                'nav.contact': 'تماس',
                'hero.title1': 'سلام! من رضا اسماعیلی هستم',
                'hero.title2': 'توسعه دهنده فرانت اند',
                'hero.title3': 'و طراح رابط کاربری',
                'hero.description': 'با تخصص در React، Next.js و TypeScript، تجربه‌های کاربری مدرن و به یاد ماندنی خلق می‌کنم.',
                'hero.codeComment': '// آماده همکاری در پروژه‌های خلاقانه',
                'hero.viewProjects': 'مشاهده پروژه‌ها',
                'hero.startCollaboration': 'شروع همکاری',
                'hero.stats.experience': 'سال تجربه در توسعه فرانت‌اند',
                'hero.stats.projects': 'پروژه موفق تحویل داده شده',
                'hero.stats.satisfaction': 'رضایت مشتریان از کیفیت کار',
                'hero.techTitle': 'تکنولوژی‌های مورد استفاده',
                'about.title': 'درباره من',
                'about.intro1': 'یک توسعه‌دهنده فرانت‌اند پرشور با ۳ سال تجربه در ساخت رابط‌های کاربری مدرن و تعاملی. تخصص اصلی من در اکوسیستم React شامل Next.js، TypeScript و ابزارهای مدرن توسعه است.',
                'about.intro2': 'عاشق حل چالش‌های پیچیده و ایجاد تجربه‌های کاربری استثنایی هستم. همیشه در حال یادگیری تکنولوژی‌های جدید و بهبود مهارت‌هایم می‌باشم.',
                'about.specialties.uiux': 'طراحی رابط کاربری',
                'about.specialties.pwa': 'اپلیکیشن‌های وب',
                'about.specialties.seo': 'بهینه‌سازی موتور جستجو',
                'timeline.job1.role': 'Frontend Developer',
                'timeline.job1.company': 'شرکت فناوری وب',
                'timeline.job1.period': '۱۴۰۱ - اکنون',
                'timeline.job2.role': 'React Developer',
                'timeline.job2.company': 'استارتاپ دیجیتال',
                'timeline.job2.period': '۱۴۰۰ - ۱۴۰۱',
                'timeline.job3.role': 'Web Developer',
                'timeline.job3.company': 'فریلنسر',
                'timeline.job3.period': '۱۳۹۹ - ۱۴۰۰',
                'skills.title': 'مهارت‌های تخصصی',
                'skills.subtitle': 'تسلط کامل بر تکنولوژی‌های مدرن توسعه فرانت‌اند و ابزارهای مرتبط',
                'skills.frontend': 'فرانت‌اند',
                'skills.styling': 'استایلینگ و ابزارها',
                'skills.other': 'سایر مهارت‌ها',
                'projects.title': 'پروژه‌های منتخب',
                'projects.subtitle': 'نمونه‌ای از پروژه‌های موفق در حوزه توسعه فرانت‌اند و طراحی رابط کاربری',
                'projects.items.store.title': 'فروشگاه آنلاین',
                'projects.items.store.description': 'فروشگاه اینترنتی با React و TypeScript',
                'projects.items.dashboard.title': 'داشبورد مدیریتی',
                'projects.items.dashboard.description': 'داشبورد پیشرفته با نمودارهای تعاملی',
                'projects.items.pwa.title': 'اپلیکیشن موبایل',
                'projects.items.pwa.description': 'PWA با قابلیت آفلاین',
                'projects.cta': 'شروع پروژه جدید',
                'contact.title': 'در تماس باشید',
                'contact.subtitle': 'برای همکاری در پروژه‌های فرانت‌اند یا مشاوره در زمینه توسعه وب، از طریق راه‌های ارتباطی زیر با من در ارتباط باشید.',
                'contact.methods.email.label': 'ایمیل',
                'contact.methods.email.value': 'reza.esmaeeli@example.com',
                'contact.methods.whatsapp.label': 'واتساپ',
                'contact.methods.whatsapp.value': '+98 912 345 6789',
                'contact.methods.linkedin.label': 'لینکدین',
                'contact.methods.linkedin.value': 'linkedin.com/in/reza-esmaeeli',
                'contact.methods.github.label': 'گیت‌هاب',
                'contact.methods.github.value': 'github.com/reza-esmaeeli',
                'contact.form.title': 'ارسال پیام',
                'contact.form.name': 'نام شما',
                'contact.form.email': 'ایمیل',
                'contact.form.subject': 'موضوع',
                'contact.form.message': 'پیام شما',
                'contact.form.submit': 'ارسال پیام',
                'footer.copyright': '© ۱۴۰۳ - رضا اسماعیلی | توسعه‌دهنده فرانت‌اند',
                'footer.tagline': 'ساخته شده با ❤️ و کد نویسی خلاقانه',
                'notifications.languageChanged': 'زبان با موفقیت تغییر کرد.',
                'notifications.welcome': 'خوش آمدید! نمونه کار من آماده است.',
            },
            en: {
                'nav.home': 'Home',
                'nav.about': 'About',
                'nav.skills': 'Skills',
                'nav.projects': 'Projects',
                'nav.contact': 'Contact',
                'hero.title1': "Hi! I'm Reza Esmaeeli",
                'hero.title2': 'Frontend Developer',
                'hero.title3': 'and UI Designer',
                'hero.description': 'I craft modern and memorable user experiences with React, Next.js, and TypeScript.',
                'hero.codeComment': '// Ready to collaborate on creative projects',
                'hero.viewProjects': 'View Projects',
                'hero.startCollaboration': 'Start Collaboration',
                'hero.stats.experience': 'Years of frontend experience',
                'hero.stats.projects': 'Successful projects delivered',
                'hero.stats.satisfaction': 'Client satisfaction rate',
                'hero.techTitle': 'Technologies I work with',
                'about.title': 'About Me',
                'about.intro1': 'An enthusiastic frontend developer with 3 years of experience building modern and interactive interfaces. My core expertise lies in the React ecosystem, including Next.js, TypeScript, and modern tooling.',
                'about.intro2': 'I love solving complex challenges and creating exceptional user experiences. I am constantly learning new technologies and sharpening my skills.',
                'about.specialties.uiux': 'Interface design',
                'about.specialties.pwa': 'Progressive web apps',
                'about.specialties.seo': 'Search engine optimization',
                'timeline.job1.role': 'Frontend Developer',
                'timeline.job1.company': 'Web Technology Company',
                'timeline.job1.period': '2022 - Present',
                'timeline.job2.role': 'React Developer',
                'timeline.job2.company': 'Digital Startup',
                'timeline.job2.period': '2021 - 2022',
                'timeline.job3.role': 'Web Developer',
                'timeline.job3.company': 'Freelancer',
                'timeline.job3.period': '2020 - 2021',
                'skills.title': 'Core Skills',
                'skills.subtitle': 'Deep expertise in modern frontend technologies and supporting tools',
                'skills.frontend': 'Frontend',
                'skills.styling': 'Styling & Tooling',
                'skills.other': 'Additional Skills',
                'projects.title': 'Featured Projects',
                'projects.subtitle': 'A selection of successful frontend and UI design projects',
                'projects.items.store.title': 'Online Store',
                'projects.items.store.description': 'E-commerce platform built with React and TypeScript',
                'projects.items.dashboard.title': 'Analytics Dashboard',
                'projects.items.dashboard.description': 'Advanced dashboard with interactive charts',
                'projects.items.pwa.title': 'Mobile Web App',
                'projects.items.pwa.description': 'Progressive web app with offline support',
                'projects.cta': 'Start a new project',
                'contact.title': 'Get in Touch',
                'contact.subtitle': 'For frontend collaborations or web consultations, reach out through any of the channels below.',
                'contact.methods.email.label': 'Email',
                'contact.methods.email.value': 'reza.esmaeeli@example.com',
                'contact.methods.whatsapp.label': 'WhatsApp',
                'contact.methods.whatsapp.value': '+98 912 345 6789',
                'contact.methods.linkedin.label': 'LinkedIn',
                'contact.methods.linkedin.value': 'linkedin.com/in/reza-esmaeeli',
                'contact.methods.github.label': 'GitHub',
                'contact.methods.github.value': 'github.com/reza-esmaeeli',
                'contact.form.title': 'Send a Message',
                'contact.form.name': 'Your Name',
                'contact.form.email': 'Email',
                'contact.form.subject': 'Subject',
                'contact.form.message': 'Your Message',
                'contact.form.submit': 'Send Message',
                'footer.copyright': '© 2024 - Reza Esmaeeli | Frontend Developer',
                'footer.tagline': 'Built with ❤️ and creative code',
                'notifications.languageChanged': 'Language updated successfully.',
                'notifications.welcome': 'Welcome! My portfolio is ready to explore.',
            },
        };

        this.init();
    }

    init() {
        if (!this.languageSwitch) return;

        const savedLanguage = localStorage.getItem('language');
        const fallbackLanguage = this.languageSwitch.value || 'fa';
        const initialLanguage = SUPPORTED_LANGUAGES.includes(savedLanguage) ? savedLanguage : fallbackLanguage;

        this.applyLanguage(initialLanguage, { persist: false, notify: false });
        this.languageSwitch.value = initialLanguage;

        this.languageSwitch.addEventListener('change', (event) => {
            const selectedLanguage = event.target.value;
            this.applyLanguage(selectedLanguage, { persist: true, notify: true });
        });
    }

    applyLanguage(language, { persist = true, notify = true } = {}) {
        if (!SUPPORTED_LANGUAGES.includes(language)) {
            language = 'fa';
        }

        this.currentLanguage = language;
        const dictionary = this.translations[language];
        if (!dictionary) return;

        document.documentElement.lang = language;
        document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';

        Object.entries(dictionary).forEach(([key, value]) => {
            const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
            elements.forEach((element) => {
                if (value && typeof value === 'object' && 'html' in value) {
                    element.innerHTML = value.html;
                } else {
                    element.textContent = value;
                }
            });
        });

        if (persist) {
            localStorage.setItem('language', language);
        }

        this.languageSwitch.value = language;
        this.restartTypewriter?.();

        const languageChangeEvent = new CustomEvent('languagechange', {
            detail: { language },
        });
        document.dispatchEvent(languageChangeEvent);

        if (notify) {
            const message = this.getTranslation('notifications.languageChanged');
            if (message) {
                this.notificationSystem?.show(message, 'success');
            }
        }
    }

    getTranslation(key) {
        return this.translations[this.currentLanguage]?.[key] ?? '';
    }
}

// ==================== INITIALIZE EVERYTHING ====================
document.addEventListener('DOMContentLoaded', () => {
    const navigation = new PageNavigation();
    const themeManager = new ThemeManager();
    const backToTop = new BackToTop();
    const mobileMenu = new MobileMenu();
    const notifications = new NotificationSystem();
    const restartTypewriter = createTypewriterInitializer();
    const languageManager = new LanguageManager(notifications, restartTypewriter);
    const contactForm = new ContactForm(notifications);
    const actions = new ButtonActions(notifications);

    void navigation;
    void themeManager;
    void backToTop;
    void mobileMenu;
    void languageManager;
    void contactForm;
    void actions;

    restartTypewriter();

    const welcomeMessage = languageManager.getTranslation('notifications.welcome');
    if (welcomeMessage) {
        notifications.show(welcomeMessage, 'success', 3000);
    }
});
