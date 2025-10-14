export function initMobileMenu() {
  const body = document.body;
  const mobileMenu = document.querySelector('.mobile-menu');
  const openBtn = document.querySelector('.mob-menu-btn');
  const closeBtn = document.querySelector('.mob-menu-close-btn');

  openBtn.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
    body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    body.style.overflow = '';
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }

      if (mobileMenu.contains(link)) {
        mobileMenu.classList.remove('is-open');
        body.style.overflow = '';
      }
    });
  });
}
