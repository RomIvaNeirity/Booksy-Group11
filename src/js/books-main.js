import BooksAPI from './books-api.js';
import BooksRenderer from './books-render.js';

let currentCategory = '';
const booksPerPage = window.innerWidth >= 768 ? 24 : 10;
let allBooks = [];
let displayedBooks = 0;

const booksList = document.getElementById('books-list');
const filtersList = document.getElementById('filters-list');
const showMoreBtn = document.getElementById('show-more-btn');
const showingCount = document.getElementById('showing-count');
const totalCount = document.getElementById('total-count');

document.addEventListener('DOMContentLoaded', initBooksSection);

function initBooksSection() {
  loadCategories();
  showMoreBtn.addEventListener('click', loadMoreBooks);
  booksList.addEventListener('click', onBookClick);
}

function loadCategories() {
  const fixedCategories = [
    { list_name: 'Combined Print and E-Book Fiction' },
    { list_name: 'Combined Print and E-Book Nonfiction' },
    { list_name: 'Hardcover Fiction' },
    { list_name: 'Paperback Trade Fiction' },
    { list_name: 'Paperback Nonfiction' },
    { list_name: 'Advice How-To and Miscellaneous' },
    { list_name: 'Childrens Middle Grade Hardcover' },
  ];

  BooksRenderer.renderCategories(
    fixedCategories,
    filtersList,
    onCategoryChange
  );
  onCategoryChange('All categories');
}

function onCategoryChange(category) {
  currentCategory = category === 'All categories' ? '' : category;
  loadBooks();
}

async function loadBooks() {
  try {
    showMessage('loading', 'Loading books...');
    let booksData = currentCategory
      ? await BooksAPI.fetchBooksByCategory(currentCategory)
      : (await BooksAPI.fetchTopBooks()).flatMap(c => c.books || []);

    if (!booksData?.length) return showMessage('no-books', 'No books found');

    allBooks = booksData;
    displayedBooks = Math.min(booksPerPage, allBooks.length);
    BooksRenderer.renderBooks(allBooks.slice(0, displayedBooks), booksList);
    updateBooksUI();
  } catch (err) {
    console.error('❌ Failed to load books:', err);
    showMessage('error', 'Could not load books.');
  }
}

function loadMoreBooks() {
  const next = Math.min(displayedBooks + 4, allBooks.length);
  const moreBooks = allBooks.slice(displayedBooks, next);
  if (!moreBooks.length) return;

  BooksRenderer.renderMoreBooks(moreBooks, booksList);
  displayedBooks = next;
  updateBooksUI();
}

function updateBooksUI() {
  BooksRenderer.updateCounters(
    displayedBooks,
    allBooks.length,
    showingCount,
    totalCount
  );
  BooksRenderer.toggleShowMoreButton(
    showMoreBtn,
    displayedBooks < allBooks.length
  );
}
function showMessage(type, text) {
  booksList.innerHTML = `<li class="${type}-message">${text}</li>`;
}
