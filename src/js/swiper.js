import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard  } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/pagination';

export const heroSwiper = new Swiper('.hero-swiper', {
  modules: [Navigation],
    speed: 600,
    loop: false,
    keyboard: {
        enabled: true,
        onlyInViewport: true
    },
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});
