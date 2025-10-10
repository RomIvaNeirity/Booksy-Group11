import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

import BooksAPI from './books-api';

// const bookList = document.querySelector('.books-list');
const bookImg = document.querySelector('.book-img-container');
const bookDetails = document.querySelector("[data-category='details'");

async function showBook(bookId) {
  try {
    const bookData = await BooksAPI.fetchBookById(bookId);
    console.log(bookData);
    renderBook(bookData);
  } catch (error) {
    console.log(error);
    return;
  }
}

function renderBook({ book_image, description }) {
  bookImg.innerHTML = `<img class="book-img" src="${book_image}" alt="">`;
  if (description.length) bookDetails.textContent = description;
}

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
