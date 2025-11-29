// Contact Section Scripts
document.addEventListener('DOMContentLoaded', () => {
    // Initialize contact page components
    initializeBackToTop();
    initializeMobileMenu();
    initializeContactForm();
    initializeNavigation();
    initializeSocialLinks();
    
    // Add animation to contact elements
    animateContactElements();
});

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

// Initialize contact form with validation and submission
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('لطفا تمامی فیلدها را پر کنید.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('آدرس ایمیل نامعتبر است.', 'error');
            return;
        }
        
        // Simulate form submission
        submitForm(formData);
    });
}

// Simulate form submission
function submitForm(formData) {
    // Show loading state
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="flex items-center justify-center gap-2"><span>در حال ارسال...</span><i class="fa-solid fa-spinner fa-spin"></i></span>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('پیام شما با موفقیت ارسال شد! به زودی پاسخگوی شما خواهم بود.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
    }, 2000);
}

// Show notification
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

// Initialize social links
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('footer a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's an external link, open in new tab
            if (href && href.startsWith('http')) {
                e.preventDefault();
                window.open(href, '_blank');
            }
        });
    });
}

// Animate contact elements when they come into view
function animateContactElements() {
    const contactElements = document.querySelectorAll('.contact-info, .contact-form');
    
    contactElements.forEach((element, index) => {
        // Add staggered animation
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 50);
        }, index * 150);
    });
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Add magnetic effect to buttons
function initializeMagneticButtons() {
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

// Initialize magnetic buttons
initializeMagneticButtons();