import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

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
