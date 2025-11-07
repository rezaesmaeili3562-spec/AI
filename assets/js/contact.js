(function () {
  const revealTargets = document.querySelectorAll('.section-hidden');
  if (revealTargets.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    revealTargets.forEach((target) => observer.observe(target));
  }

  const form = document.getElementById('contactForm');
  const loader = document.getElementById('formLoading');
  if (!form) return;

  const showLoader = (show) => {
    if (!loader) return;
    if (show) {
      loader.classList.add('visible');
    } else {
      loader.classList.remove('visible');
    }
  };

  const showError = (field, message) => {
    clearError(field);
    field.classList.add('input-error');
    const error = document.createElement('div');
    error.className = 'input-error-message';
    error.textContent = message;
    field.parentElement.appendChild(error);
  };

  const clearError = (field) => {
    field.classList.remove('input-error');
    const existing = field.parentElement.querySelector('.input-error-message');
    if (existing) existing.remove();
  };

  const isValidEmail = (value) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let valid = true;
    ['name', 'email', 'subject', 'message'].forEach((name) => {
      const field = form.elements[name];
      if (!field.value.trim()) {
        valid = false;
        showError(field, 'پر کردن این فیلد الزامی است');
      } else if (field.type === 'email' && !isValidEmail(field.value)) {
        valid = false;
        showError(field, 'آدرس ایمیل معتبر نیست');
      } else {
        clearError(field);
      }
    });

    if (!valid) {
      window.appNotification?.show('لطفا اطلاعات را به درستی تکمیل کنید.', 'error');
      return;
    }

    showLoader(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      form.reset();
      window.appNotification?.show('پیام شما با موفقیت ارسال شد.', 'success');
    } catch (error) {
      window.appNotification?.show('ارسال پیام با خطا مواجه شد. لطفا مجددا تلاش کنید.', 'error');
    } finally {
      showLoader(false);
    }
  });

  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('input', () => clearError(field));
  });
})();
