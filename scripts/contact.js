function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  form.reset();
  const notification = window.notificationSystem;
  if (notification) {
    notification.show('پیام شما با موفقیت ارسال شد!', 'success', 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', handleContactSubmit);
  }
});
