import BooksAPI from './books-api.js';
import BooksRenderer from './books-render.js';
import { onBookClick } from './book-modal.js';

let currentCategory = '';
let booksPerPage = 10;
let allBooks = [];
let displayedBooks = 0;

const booksList = document.getElementById('books-list');
const filtersList = document.getElementById('filters-list');
const showMoreBtn = document.getElementById('show-more-btn');
const showingCount = document.getElementById('showing-count');
const totalCount = document.getElementById('total-count');

document.addEventListener('DOMContentLoaded', initBooksSection);

async function initBooksSection() {
  updateBooksPerPage();
  await loadCategories();
  setupListeners();
}
function setupListeners() {
  showMoreBtn.addEventListener('click', loadMoreBooks);
  booksList.addEventListener('click', onBookClick);
}

function updateBooksPerPage() {
  booksPerPage = window.innerWidth >= 768 ? 24 : 10;
}
async function loadCategories() {
  try {
    showLoadingState('Loading categories...');
    const categories = await BooksAPI.fetchCategories();
    BooksRenderer.renderCategories(categories, filtersList, category =>
      onCategoryChange(category)
    );
    onCategoryChange('All categories');
  } catch {
    showError('Could not load categories.');
  }
}
function onCategoryChange(category) {
  currentCategory = category === 'All categories' ? '' : category;
  loadBooks();
}
async function loadBooks() {
  try {
    showLoadingState('Loading books...');
    let booksData = [];
    if (currentCategory) {
      booksData = await BooksAPI.fetchBooksByCategory(currentCategory);
    } else {
      const topBooksData = await BooksAPI.fetchTopBooks();
      booksData = topBooksData.flatMap(c => c.books || []);
    }
    if (!booksData.length) {
      showNoBooksMessage();
      return;
    }
    allBooks = booksData;
    displayedBooks = Math.min(booksPerPage, allBooks.length);
    BooksRenderer.renderBooks(allBooks.slice(0, displayedBooks), booksList);
    updateBooksUI();
  } catch {
    showError('Could not load books.');
  }
}
function loadMoreBooks() {
  const next = Math.min(displayedBooks + 4, allBooks.length);
  const moreBooks = allBooks.slice(displayedBooks, next);
  if (moreBooks.length > 0) {
    BooksRenderer.renderMoreBooks(moreBooks, booksList);
    displayedBooks = next;
    updateBooksUI();
  }
}
function showLoadingState(text = 'Loading...') {
  booksList.innerHTML = `<li class="loading-message">${text}</li>`;
}
function showError(msg) {
  booksList.innerHTML = `<li class="error-message">${msg}</li>`;
}
function showNoBooksMessage() {
  booksList.innerHTML = '<li class="no-books-message">No books found</li>';
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
