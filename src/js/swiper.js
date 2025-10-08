import Swiper from 'swiper';
import 'swiper/css';


export const swiper = new Swiper('.swiper', {
     speed: 400,
  spaceBetween: 100,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
})
