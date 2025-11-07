
class ContentLoader {
    constructor() {
        this.sections = document.querySelectorAll('[data-include]');
    }

    async load() {
        for (const section of this.sections) {
            const url = section.getAttribute('data-include');
            if (!url) continue;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to load ${url}: ${response.status}`);
                }
                const markup = await response.text();
                section.innerHTML = markup;
            } catch (error) {
                console.error(error);
                section.innerHTML = '<div class="text-center text-red-500 py-20">خطا در بارگذاری محتوا</div>';
            }
        }
    }
}

// ==================== PRELOADER ====================
        window.addEventListener('load', () => {
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 700);
            }, 1000);
        });

        // ==================== PAGE NAVIGATION ====================
        class PageNavigation {
            constructor() {
                this.pages = document.querySelectorAll('.page');
                this.navLinks = document.querySelectorAll('.nav-link');
                this.init();
            }
            
            init() {
                // Add event listeners to nav links
                this.navLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const page = link.getAttribute('data-page');
                        this.showPage(page);
                    });
                });

                // Add event listeners to buttons
                document.querySelectorAll('.view-projects-btn').forEach(btn => {
                    btn.addEventListener('click', () => this.showPage('projects'));
                });

                document.querySelectorAll('.contact-btn').forEach(btn => {
                    btn.addEventListener('click', () => this.showPage('contact'));
                });
            }
            
            showPage(pageName) {
                // Hide all pages
                this.pages.forEach(page => {
                    page.classList.remove('active');
                });
                
                // Show selected page
                const targetPage = document.getElementById(`${pageName}-page`);
                if (targetPage) {
                    targetPage.classList.add('active');
                    
                    // Scroll to top
                    window.scrollTo(0, 0);
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
                // Check saved theme or prefer-color-scheme
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
                        behavior: 'smooth'
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
                this.menuBtn.addEventListener('click', () => this.toggleMenu());
                
                // Close menu when clicking on links
                this.mobileMenu.querySelectorAll('a').forEach(link => {
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
            this.init();
            this.show('خوش آمدید! نمونه کار من آماده است.', 'success', 3000);
            }
            
            show(message, type = 'success', duration = 3000) {
                this.notification.textContent = message;
                this.notification.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-50 ${
                    type === 'success' ? 'bg-green-500 text-white' : 
                    type === 'error' ? 'bg-red-500 text-white' :
                    'bg-blue-500 text-white'
                }`;
                this.notification.style.display = 'block';
                
                setTimeout(() => {
                    this.hide();
                }, duration);
            }
            
            hide() {
                this.notification.style.display = 'none';
            }
        }
        
        // ==================== FORM HANDLING ====================
        class ContactForm {
            constructor() {
                this.form = document.getElementById('contactForm');
                this.init();
            }
            
            init() {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            }
            
            async handleSubmit(e) {
                e.preventDefault();
                
                const notification = new NotificationSystem();
                notification.show('پیام شما با موفقیت ارسال شد!', 'success');
                
                this.form.reset();
            }
        }
        
        // ==================== BUTTON ACTIONS ====================
        class ButtonActions {
            constructor() {
                this.init();
            }
            
            init() {
                // Download Resume
                document.getElementById('downloadResume').addEventListener('click', () => {
                    const notification = new NotificationSystem();
                    notification.show('در حال دانلود رزومه...', 'success');
                    
                    setTimeout(() => {
                        const link = document.createElement('a');
                        link.href = '#';
                        link.download = 'resume-reza-esmaeeli.pdf';
                        link.click();
                    }, 1000);
                });

                // WhatsApp
                document.getElementById('whatsappBtn').addEventListener('click', () => {
                    window.open('https://wa.me/989123456789', '_blank');
                });

                // GitHub
                document.getElementById('viewGithub').addEventListener('click', () => {
                    window.open('https://github.com/reza-esmaeeli', '_blank');
                });
            }
        }

        // ==================== INITIALIZE EVERYTHING ====================
        document.addEventListener('DOMContentLoaded', async () => {
    const contentLoader = new ContentLoader();
    await contentLoader.load();
            new PageNavigation();
            new ThemeManager();
            new BackToTop();
            new MobileMenu();
            new ContactForm();
            new ButtonActions();
            new NotificationSystem();

            // Typewriter effect
            setTimeout(() => {
                document.getElementById('line1').style.animation = 'typing 2s steps(30, end) 0.5s forwards, blink-caret 0.75s step-end infinite';
            }, 500);

            setTimeout(() => {
                document.getElementById('line2').style.animation = 'typing 2.5s steps(40, end) 3s forwards, blink-caret 0.75s step-end infinite';
            }, 3000);

            setTimeout(() => {
                document.getElementById('line3').style.animation = 'typing 3s steps(50, end) 6s forwards, blink-caret 0.75s step-end infinite';
            }, 6000);
        });
