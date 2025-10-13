import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

import BooksAPI from './books-api';

const bookModalFullscreen = document.querySelector('.book-modal-layer');
const bookDecsription = document.querySelector('.book-desc-wrapper');
const bookImg = document.querySelector('.book-img-container');
const bookDetails = document.querySelector("[data-category='details']");
const bookModal = document.querySelector('.book-modal');
const bookModalCloseBtn = document.querySelector('.btn-close-modal');
const bookForm = document.querySelector('.book-form');
const bookIdInput = document.querySelector('.book-id-input');

async function showBook(bookId) {
  try {
    const bookData = await BooksAPI.fetchBookById(bookId);
    renderBook(bookData);
    openModal();
  } catch (error) {
    console.log(error);
    return;
  }
}

function openModal() {
  bookModalFullscreen.classList.add('is-opened');

  bookModalFullscreen.addEventListener('click', closeModalByClick);
  bookModalCloseBtn.addEventListener('click', closeModalByClick);
  document.addEventListener('keydown', closeModalByKey);

  bookForm.addEventListener('submit', onBookFormSubmit);
  bookForm.addEventListener('click', onBookFormClick);
  disableScroll();

  setupAccordeon();
}

function closeModal() {
  bookModalFullscreen.classList.remove('is-opened');

  bookModalFullscreen.removeEventListener('click', closeModal);
  bookModalCloseBtn.removeEventListener('click', closeModalByClick);
  document.removeEventListener('keydown', closeModal);

  bookForm.removeEventListener('click', onBookFormClick);
  bookForm.removeEventListener('submit', onBookFormSubmit);
  enableScroll();

  clearAccordeon();
}

function closeModalByClick(event) {
  if (
    (event.currentTarget.classList.contains('book-modal-layer') &&
      event.target === event.currentTarget) ||
    event.currentTarget === bookModalCloseBtn
  )
    closeModal();
}

function closeModalByKey(event) {
  if (event.code === 'Escape') closeModal();
}

function renderBook({ _id, book_image, title, author, price, description }) {
  bookImg.innerHTML = `<img class="book-img" src="${book_image}" alt="">`;
  bookDetails.textContent = description.length
    ? description
    : title + ' by ' + author;
  bookDecsription.innerHTML = `
        <h3 class="book-title">${title}</h3>
        <p class="book-author">${author}</p>
        <p class="book-price">&#36;${price}</p>`;
  bookIdInput.value = _id;
  return;
}

function setupAccordeon() {
  const accordion = new Accordion('.accordion-container', {
    duration: 400,
    showMultiple: true,
  });
  accordion.attachEvents();
}

function clearAccordeon() {
  const accordion = new Accordion('.accordion-container', {
    duration: 400,
    showMultiple: true,
  });
  accordion.detachEvents();
}

function increaseBookAmount(event) {
  let amount = Number(document.querySelector('[name="amount"]').value);
  amount++;
  document.querySelector('[name="amount"]').value = amount;

  if (document.querySelector('.btn-minus').disabled)
    document.querySelector('.btn-minus').disabled = false;
}

function decreaseBookAmount(event) {
  let amount = Number(document.querySelector('[name="amount"]').value);
  amount--;
  document.querySelector('[name="amount"]').value = amount;
  if (amount == 0) document.querySelector('.btn-minus').disabled = true;
}

function addToCart(event) {
  const order = {
    book: event.currentTarget.elements.book.value,
    quantity: event.currentTarget.elements.amount.value,
  };
  if (order.quantity === '0')
    console.log('Book is not added because of the 0 quantity:');
  console.log(order);
}

function onBookFormClick(event) {
  if (event.target.nodeName !== 'BUTTON') return;
  console.log('click', event.target);
  event.preventDefault();

  if (event.target.classList.contains('btn-add-to-cart')) addToCart(event);
  else if (event.target.classList.contains('btn-minus'))
    decreaseBookAmount(event);
  else if (event.target.classList.contains('btn-plus'))
    increaseBookAmount(event);
}

function onBookFormSubmit(event) {
  console.log('submit', event.target);
  event.preventDefault();
  const order = {
    book: event.target.elements.book.value,
    quantity: event.target.elements.amount.value,
  };
  console.log(order);
  alert('Дякуємо за покупку');
}

function disableScroll() {
  document.querySelector('body').classList.add('menu-open');
}

function enableScroll() {
  document.querySelector('body').classList.remove('menu-open');
}

export function onBookClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  const bookId = event.target.dataset.id;
  showBook(bookId);
}
