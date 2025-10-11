export function initMobileMenu() {
  const body = document.body;
  const mobileMenu = document.querySelector('.mobile-menu');
  const openBtn = document.querySelector('.mob-menu-btn');
  const closeBtn = document.querySelector('.mob-menu-close-btn');

  openBtn.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
    body.classList.add('menu-open');
  });

  closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    body.classList.remove('menu-open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      body.classList.remove('menu-open');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        mobileMenu.classList.remove('is-open');
        body.classList.remove('menu-open');
      }
    });
  });
}
