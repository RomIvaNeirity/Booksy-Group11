import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

import { getBook } from './api';

const bookContainer = document.querySelector('.book-info-container');
const bookImg = document.querySelector('.book-img-container');
const bookDetails = document.querySelector("[data-category='details'");
const bookShipping = document.querySelector("[data-category='shipping'");
const bookReturns = document.querySelector("[data-category='returns'");

const btn = document.querySelector('.book-more');

async function showBook(bookId) {
  try {
    const bookData = await getBook(bookId);
    console.log(bookData);
    renderBook(bookData);
  } catch (error) {
    console.log(error);
    return;
  }
}

function renderBook(book) {
  bookImg.innerHTML = `<img class="book-img" src="${book.book_image}" alt="">`;
  bookDetails.textContent = book.description;
  bookShipping.textContent =
    'We ship across the United States within 2–5 business days. All orders are processed through USPS or a reliable courier service. Enjoy free standard shipping on orders over $50.';
  bookReturns.textContent =
    'You can return an item within 14 days of receiving your order, provided it hasn’t been used and is in its original condition. To start a return, please contact our support team — we’ll guide you through the process quickly and hassle-free.';
}

btn.addEventListener('click', event => {
  // console.log(event.target.data.id);
  const bookId = '643282b1e85766588626a080';
  console.log(`Show Book ${bookId}`);
  showBook(bookId);
});

const accordion = new Accordion('.accordion-container', {
  duration: 400,
  showMultiple: true,
});
accordion.attachEvents();
