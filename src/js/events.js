import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const swiperEvents = new Swiper('.events-swiper', {
  modules: [Navigation, Pagination],

  speed: 350,
  slidesPerView: 'auto',
  spaceBetween: 16,
  watchOverflow: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    bulletClass: 'swiper-pagination-bullet',
    bulletActiveClass: 'swiper-pagination-bullet-active',
  },

  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 24 },
    1440: { slidesPerView: 3, spaceBetween: 24 },
  },
});
