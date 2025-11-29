// Home Section Scripts
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all home page components
    initializePreloader();
    initializeThemeManager();
    initializeBackToTop();
    initializeMobileMenu();
    initializeButtonActions();
    initializeTypewriterEffect();
    initializeFloatingButtons();
    
    // Show welcome notification
    showNotification('خوش آمدید! نمونه کار من آماده است.', 'success', 3000);
});

// Preloader functionality
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 700);
    }, 1000);
}

// Theme management
function initializeThemeManager() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    if (!themeToggle || !themeIcon) return;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        enableDarkMode(themeIcon);
    }

    themeToggle.addEventListener('click', () => toggleTheme(themeIcon));
}

function enableDarkMode(themeIcon) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

function enableLightMode(themeIcon) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

function toggleTheme(themeIcon) {
    if (document.documentElement.classList.contains('dark')) {
        enableLightMode(themeIcon);
    } else {
        enableDarkMode(themeIcon);
    }
}

// Back to top functionality
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Button actions functionality
function initializeButtonActions() {
    const downloadResumeBtn = document.getElementById('downloadResume');
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', () => {
            showNotification('در حال دانلود رزومه...', 'success');
            
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = '#';
                link.download = 'resume-reza-esmaeili.pdf';
                link.click();
            }, 1000);
        });
    }

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            window.open('https://wa.me/989123456789', '_blank');
        });
    }
}

// Notification system
function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.getElementById('notification');
    if (!notification) return;

    notification.textContent = message;
    const baseClass = 'fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-50';
    const themeClass =
        type === 'success'
            ? 'bg-green-500 text-white'
            : type === 'error'
            ? 'bg-red-500 text-white'
            : 'bg-blue-500 text-white';

    notification.className = `${baseClass} ${themeClass}`;
    notification.style.display = 'block';

    window.clearTimeout(hideNotificationTimeout);
    hideNotificationTimeout = window.setTimeout(() => hideNotification(), duration);
}

let hideNotificationTimeout;

function hideNotification() {
    const notification = document.getElementById('notification');
    if (!notification) return;
    notification.style.display = 'none';
}

// Typewriter effect for home page
function initializeTypewriterEffect() {
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
}

// Floating buttons magnetic effect
function initializeFloatingButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const dx = x - centerX;
            const dy = y - centerY;
            
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 20;
            
            if (distance < maxDistance) {
                btn.style.transform = `translate(${dx * 0.1}px, ${dy * 0.1}px)`;
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}