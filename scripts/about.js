document.addEventListener('DOMContentLoaded', () => {
  const notification = window.notificationSystem;
  if (notification) {
    notification.show('تجربه‌های کاری من را می‌توانید در این صفحه ببینید.', 'info', 3500);
  }
});
