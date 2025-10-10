import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';

// Swiper CSS (core + модулі)
import 'swiper/css';
/* import 'swiper/css/navigation'; */
import 'swiper/css/pagination';

// надійніше — ініціювати коли DOM готовий
document.addEventListener('DOMContentLoaded', () => {
  const heroSwiper = new Swiper('.hero-swiper', {
    modules: [Navigation],
    
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
  });
});


const feedbacksSwiper = new Swiper('.feedback-swiper', {
    modules:[Navigation, Pagination, Keyboard],
  loop: false,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1440: {
      slidesPerView: 3,
    },
  },
});


