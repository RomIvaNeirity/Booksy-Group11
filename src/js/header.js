export function initMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const openBtn = document.querySelector('.mob-menu-btn');
  const closeBtn = document.querySelector('.mob-menu-close-btn');
  const scrollLinks = document.querySelectorAll(
    '.nav-link, .mob-nav-link, a[href^="#"]'
  );

  const openMenu = () => {
    mobileMenu.classList.add('is-open');
    document.body.classList.add('menu-open');
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  if (openBtn) openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  scrollLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        event.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }

      if (link.classList.contains('mob-nav-link')) {
        closeMenu();
      }
    });
  });
}
