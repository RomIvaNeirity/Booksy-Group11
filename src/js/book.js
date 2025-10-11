import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

import BooksAPI from './books-api';

const bookModalFullscreen = document.querySelector('.book-modal-layer');
// const bookDecsription = document.querySelector('.book-desc');
// const bookImg = document.querySelector('.book-img-container');
// const bookDetails = document.querySelector("[data-category='details']");
const bookModal = document.querySelector('.book-modal');

async function showBook(bookId) {
  try {
    const bookData = await BooksAPI.fetchBookById(bookId);
    // console.log(bookData);
    renderBook(bookData);
    bookModalFullscreen.classList.add('is-opened');

    bookModalFullscreen.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);

    const bookForm = document.querySelector('.book-form');
    bookForm.addEventListener('click', onBookFormClick);
    bookForm.addEventListener('submit', onBookFormSubmit);
    disableScroll();

    setupAccordeon();
  } catch (error) {
    console.log(error);
    return;
  }
}

function closeModal(event) {
  if (
    event.target.classList.contains('btn-close-modal') ||
    event.target.classList.contains('book-modal-layer') ||
    event.code === 'Escape'
  ) {
    bookModalFullscreen.classList.remove('is-opened');

    bookModalFullscreen.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModal);

    const bookForm = document.querySelector('.book-form');
    bookForm.removeEventListener('click', onBookFormClick);
    bookForm.removeEventListener('submit', onBookFormSubmit);
    enableScroll();

    clearAccordeon();
  }
}

function renderBook({ _id, book_image, title, author, price, description }) {
  bookModal.innerHTML = `<div class="book-info-container">
      <div class="book-img-container">
        <img class="book-img" src="${book_image}" alt="${title}">
      </div>
      <div class="book-desc">
        <h3 class="book-title">${title}</h3>
        <p class="book-author">${author}</p>
        <p class="book-price">${price}</p>
        <form class="book-form">
          <input type="hidden" name="book" value="${_id}" />
          <div class="book-amount-wrapper">
            <button class="btn btn-secondary btn-minus" type="button" disabled>-</button>
            <input type="number" name="amount" id="amount" value="1" disabled />
            <button class="btn btn-secondary btn-plus" type="button">+</button>
          </div>
          <div class="book-action-wrapper">
            <button class="btn btn-add-to-cart" type="button">Add to cart</button>
            <button class="btn btn-secondary" type="submit">Buy now</button>
          </div>
        </form>
        <ul class="accordion-container">
          <li class="ac">
            <h4 class="ac-header">
              <button type="button" class="ac-trigger">Details</button>
            </h4>
            <div class="ac-panel">
              <p class="ac-text" data-category="details">
                ${description.length ? description : title + ' by ' + author}
              </p>
            </div>
          </li>
          <li class="ac">
            <h4 class="ac-header">
              <button type="button" class="ac-trigger">Shipping</button>
            </h4>
            <div class="ac-panel">
              <p class="ac-text" data-category="shipping">
                We ship across the United States within 2–5 business days. All
                orders are processed through USPS or a reliable courier service.
                Enjoy free standard shipping on orders over $50.
              </p>
            </div>
          </li>
          <li class="ac">
            <h4 class="ac-header">
              <button type="button" class="ac-trigger">Returns</button>
            </h4>
            <div class="ac-panel">
              <p class="ac-text" data-category="returns">
                You can return an item within 14 days of receiving your order,
                provided it hasn’t been used and is in its original condition.
                To start a return, please contact our support team — we’ll guide
                you through the process quickly and hassle-free.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <button class="btn btn-secondary btn-close-modal" type="button">x</button>`;

  return;
  // bookImg.innerHTML = `<img class="book-img" src="${book_image}" alt="">`;
  // if (description.length) bookDetails.textContent = description;
  // bookDecsription.insertAdjacentHTML(
  //   'afterbegin',
  //   `
  //       <h3 class="book-title">${title}</h3>
  //       <p class="book-author">${author}</p>
  //       <p class="book-price">${price}</p>`
  // );
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
  if (amount == 1) document.querySelector('.btn-minus').disabled = true;
}

function addToCart(event) {
  const order = {
    book: event.currentTarget.elements.book.value,
    quantity: event.currentTarget.elements.amount.value,
  };
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
  event.preventDefault();
  const order = {
    book: event.target.elements.book.value,
    quantity: event.target.elements.amount.value,
  };
  console.log(order);
  alert('Дякуємо за покупку');
}

function blockScroll(event) {
  event.preventDefault();
}

function blockScrollByKeys(event) {
  if (
    [
      'ArrowUp',
      'ArrowDown',
      'PageUp',
      'PageDown',
      'Home',
      'End',
      'Space',
    ].includes(event.key)
  ) {
    event.preventDefault();
  }
}

function disableScroll() {
  window.addEventListener('wheel', blockScroll, { passive: false });
  window.addEventListener('touchmove', blockScroll, { passive: false });
  window.addEventListener('keydown', blockScrollByKeys, {
    passive: false,
  });
}

function enableScroll() {
  window.removeEventListener('wheel', blockScroll, { passive: false });
  window.removeEventListener('touchmove', blockScroll, { passive: false });
  window.removeEventListener('keydown', blockScrollByKeys, {
    passive: false,
  });
}

export function onBookClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  const bookId = event.target.dataset.id;
  showBook(bookId);
}
