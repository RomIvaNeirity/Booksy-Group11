import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import BooksAPI from './books-api';

const bookModalFullscreen = document.querySelector('.book-modal-layer');
const bookDecsription = document.querySelector('.book-desc-wrapper');
const bookImg = document.querySelector('.book-img-container');
const bookDetails = document.querySelector("[data-category='details']");
const bookModalCloseBtn = document.querySelector('.btn-close-modal');
const bookIdInput = document.querySelector('.book-id-input');
const bookForm = document.querySelector('.book-form');
const bookFormAmountContainer = document.querySelector('.book-amount-wrapper');
const bookFormAddBtn = document.querySelector('.btn-add-to-cart');
const bookFormBuyBtn = document.querySelector('.btn-buy');

const accordion = new Accordion('.accordion-container', {
  duration: 400,
  showMultiple: true,
});

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
  bookFormAmountContainer.addEventListener('click', onBookFormClick);
  bookFormAddBtn.addEventListener('click', onBookFormClick);
  disableScroll();

  setupAccordeon();
}

function closeModal() {
  bookModalFullscreen.classList.remove('is-opened');

  bookModalFullscreen.removeEventListener('click', closeModal);
  bookModalCloseBtn.removeEventListener('click', closeModalByClick);
  document.removeEventListener('keydown', closeModal);

  bookForm.removeEventListener('submit', onBookFormSubmit);
  bookFormAmountContainer.removeEventListener('click', onBookFormClick);
  bookFormAddBtn.removeEventListener('click', onBookFormClick);
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
  accordion.attachEvents();
}

function clearAccordeon() {
  accordion.closeAll();
  accordion.detachEvents();
}

function increaseBookAmount(event) {
  let amount = Number(document.querySelector('[name="amount"]').value);
  amount++;
  document.querySelector('[name="amount"]').value = amount;

  if (amount === 1) {
    document.querySelector('.btn-minus').disabled = false;
    bookFormBuyBtn.disabled = false;
  }
}

function decreaseBookAmount(event) {
  let amount = Number(document.querySelector('[name="amount"]').value);
  amount--;
  document.querySelector('[name="amount"]').value = amount;
  if (amount === 0) {
    document.querySelector('.btn-minus').disabled = true;
    bookFormBuyBtn.disabled = true;
  }
}

function addToCart(event) {
  const form = event.target.closest('.book-form');
  const order = {
    book: form.elements.book.value,
    quantity: form.elements.amount.value,
  };
  if (order.quantity === '0')
    console.log('Book is not added because of the 0 quantity:');
  console.log(order);
}

function onBookFormClick(event) {
  if (event.target.nodeName !== 'BUTTON') return;
  event.preventDefault();

  if (event.target.classList.contains('btn-add-to-cart')) addToCart(event);
  else if (event.target.classList.contains('btn-minus'))
    decreaseBookAmount(event);
  else if (event.target.classList.contains('btn-plus'))
    increaseBookAmount(event);
}

function onBookFormSubmit(event) {
  const form = event.target.elements;
  console.log('submit', event.target);
  event.preventDefault();
  const order = {
    book: form.book.value,
    title: bookModalFullscreen.querySelector('.book-title').textContent,
    quantity: form.amount.value,
  };
  console.log(order);
  iziToast.show({
    title: 'Дякуємо за покупку',
    message: `${order.title} x${order.quantity}`,
  });
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
