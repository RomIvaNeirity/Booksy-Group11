export function initScrollButton() {
  const scrollButton = document.querySelector('.scroll-up-btn');
  if (!scrollButton) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  });

  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
