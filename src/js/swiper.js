import Swiper from 'swiper';

import { Navigation, Pagination, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export const heroSwiper = new Swiper('.hero-swiper', {
  modules: [Navigation, Keyboard],
  speed: 600,
  loop: false,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

export const swiperEvents = new Swiper('.events-swiper', {
  modules: [Navigation, Pagination, Keyboard],

  speed: 350,
  slidesPerView: 'auto',
  spaceBetween: 16,
  watchOverflow: true,
  loop: false,

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

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

export const feedbacksSwiper = new Swiper('.feedback-swiper', {
  modules: [Navigation, Pagination, Keyboard],
  speed: 600,
  spaceBetween: 24,
  loop: false,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  pagination: {
    el: '.swiper-pagination-feedbacks',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 4,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1440: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
});
