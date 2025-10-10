import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export const heroSwiper = new Swiper('.hero-swiper', {
  modules: [Navigation],
  speed: 600,
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }, on: {
    init() {
      updateButtons(this);
    },
    slideChange() {
      updateButtons(this);
    },
  },
});

function updateButtons(swiper) {
  const prevBtn = document.querySelector('.swiper-button-prev');
  const nextBtn = document.querySelector('.swiper-button-next');

  if (swiper.isBeginning) {
    prevBtn.classList.add('swiper-button-disabled');
  } else {
    prevBtn.classList.remove('swiper-button-disabled');
  }
 
  if (swiper.isEnd) {
    nextBtn.classList.add('swiper-button-disabled');
  } else {
    nextBtn.classList.remove('swiper-button-disabled');
  }
}
;
