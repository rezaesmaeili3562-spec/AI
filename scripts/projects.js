document.addEventListener('DOMContentLoaded', () => {
  const startProjectBtn = document.querySelector('.start-project-btn');
  if (startProjectBtn) {
    startProjectBtn.addEventListener('click', () => {
      window.location.href = 'contact.html';
    });
  }

  const notification = window.notificationSystem;
  if (notification) {
    notification.show('نمونه پروژه‌ها را بررسی کنید و برای همکاری پیام بدهید.', 'info', 3500);
  }
});
