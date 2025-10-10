import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

import BooksAPI from './books-api';

const bookModal = document.querySelector('.book-modal-layer');
const bookDecsription = document.querySelector('.book-desc');
const bookImg = document.querySelector('.book-img-container');
const bookDetails = document.querySelector("[data-category='details']");
const bookClose = document.querySelector('.btn-close-modal');

async function showBook(bookId) {
  try {
    const bookData = await BooksAPI.fetchBookById(bookId);
    console.log(bookData);
    renderBook(bookData);
    bookModal.classList.add('is-opened');

    bookModal.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);
  } catch (error) {
    console.log(error);
    return;
  }
}

function renderBook({ book_image, title, author, price, description }) {
  bookImg.innerHTML = `<img class="book-img" src="${book_image}" alt="">`;
  if (description.length) bookDetails.textContent = description;
  bookDecsription.insertAdjacentHTML(
    'afterbegin',
    `
        <h3 class="book-title">${title}</h3>
        <p class="book-author">${author}</p>
        <p class="book-price">${price}</p>`
  );
}

function closeModal(event) {
  console.log(event.code);
  if (
    event.target.classList.contains('btn-close-modal') ||
    event.target.classList.contains('book-modal-layer') ||
    event.code === 'Escape'
  ) {
    bookModal.classList.remove('is-opened');
    bookModal.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModal);
  }
}

bookModal.addEventListener('scroll', event => {
  event.stopPropagation();
});

export function onBookClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  // const bookId = '643282b1e85766588626a080';
  const bookId = event.target.dataset.id;
  showBook(bookId);
}

const accordion = new Accordion('.accordion-container', {
  duration: 400,
  showMultiple: true,
});
accordion.attachEvents();
