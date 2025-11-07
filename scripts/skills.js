function animateSkills(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const bar = entry.target;
    const percentage = bar.getAttribute('data-percentage');
    if (percentage) {
      bar.style.width = `${percentage}%`;
    }
    observer.unobserve(bar);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const bars = document.querySelectorAll('.skill-bar');
  bars.forEach((bar) => {
    bar.style.width = '0%';
  });

  const observer = new IntersectionObserver(animateSkills, {
    threshold: 0.3,
  });

  bars.forEach((bar) => observer.observe(bar));

  const notification = window.notificationSystem;
  if (notification) {
    notification.show('برای مشاهده مهارت‌ها به پایین صفحه اسکرول کنید.', 'info', 3000);
  }
});
