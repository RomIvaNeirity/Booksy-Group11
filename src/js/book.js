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

function renderBook(book) {
  bookImg.innerHTML = `<img class="book-img" src="${book.book_image}" alt="">`;
  if (book.description.length) bookDetails.textContent = book.description;
}

// bookList.addEventListener('click', event => {
export function onBookClick(event) {
  console.log(event.target);
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  console.log(event.target.dataset.id);
  // const bookId = '643282b1e85766588626a080';
  const bookId = event.target.dataset.id;
  console.log(`Show Book ${bookId}`);
  showBook(bookId);
}

const accordion = new Accordion('.accordion-container', {
  duration: 400,
  showMultiple: true,
});
accordion.attachEvents();
