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
    },
  
});


export const feedbacksSwiper = new Swiper('.feedback-swiper', {
  modules: [Navigation, Pagination, Keyboard],
  speed:600,
  spaceBetween: 24,
  loop: false,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  pagination: {
    el: '.swiper-pagination-feedbacks',
    clickable: true,
    dynamicBullets: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 4,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 4,
    },
    1440: {
      slidesPerView: 3,
      slidesPerGroup: 4,
    },
  },
});


