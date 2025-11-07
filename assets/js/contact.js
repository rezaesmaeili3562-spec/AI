function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

class LocalNotification {
  constructor(element) {
    this.element = element;
    this.timeout = null;
  }

  show(message, type = 'info', duration = 2500) {
    if (!this.element) return;
    const styles = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white'
    };

    this.element.textContent = message;
    this.element.className = `fixed bottom-6 right-6 px-5 py-3 rounded-2xl shadow-2xl ${styles[type] || styles.info}`;
    this.element.classList.remove('hidden');

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.hide(), duration);
  }

  hide() {
    if (!this.element) return;
    this.element.classList.add('hidden');
  }
}

class ContactForm {
  constructor(form, loadingElement, notification) {
    this.form = form;
    this.loadingElement = loadingElement;
    this.notification = notification;
    this.init();
  }

  init() {
    if (!this.form) return;
    this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    this.form.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearValidation(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    if (field.type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      message = 'لطفا یک ایمیل معتبر وارد کنید';
    } else if (field.required && !value) {
      isValid = false;
      message = 'این فیلد الزامی است';
    }

    if (!isValid) {
      this.showFieldError(field, message);
    } else {
      this.clearValidation(field);
    }

    return isValid;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showFieldError(field, message) {
    this.clearValidation(field);
    field.classList.add('border-red-500', 'ring-2', 'ring-red-500/20');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }

  clearValidation(field) {
    field.classList.remove('border-red-500', 'ring-2', 'ring-red-500/20');
    const errorDiv = field.parentNode.querySelector('.text-red-500');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    let isValid = true;
    this.form.querySelectorAll('input[required], textarea[required]').forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      this.notify('لطفا تمام فیلدهای الزامی را تکمیل کنید', 'error');
      return;
    }

    this.showLoading();

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      this.form.reset();
      this.notify('پیام شما با موفقیت ارسال شد! به زودی با شما تماس می‌گیرم.', 'success');
    } catch (error) {
      this.notify('ارسال پیام با خطا مواجه شد. دوباره تلاش کنید.', 'error');
    } finally {
      this.hideLoading();
    }
  }

  showLoading() {
    if (!this.loadingElement) return;
    this.loadingElement.classList.remove('hidden');
    this.loadingElement.classList.add('flex');
  }

  hideLoading() {
    if (!this.loadingElement) return;
    this.loadingElement.classList.remove('flex');
    this.loadingElement.classList.add('hidden');
  }

  notify(message, level) {
    this.notification.show(message, level);
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'show-notification', message, level }, '*');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(localStorage.getItem('theme'));

  document.querySelectorAll('.section-hidden').forEach((section) => {
    section.classList.add('section-visible');
  });

  const form = document.getElementById('contactForm');
  const loading = document.getElementById('contactLoading');
  const notificationElement = document.getElementById('contactNotification');

  new ContactForm(form, loading, new LocalNotification(notificationElement));
});

window.addEventListener('message', (event) => {
  if (event.data?.type === 'theme-change') {
    applyTheme(event.data.theme);
  }
});
