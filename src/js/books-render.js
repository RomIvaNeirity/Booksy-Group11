export default class BooksRenderer {
  static renderCategories(categories, container, onCategoryClick) {
    const allCategory = { list_name: 'All categories' };
    const categoriesWithAll = [allCategory, ...categories];
    this._categories = categoriesWithAll;
    this._onCategoryClick = onCategoryClick;
    this._container = container;
    this._listContainer = this._container.querySelector('.filters-list');
    this._selectContainer = this._container.querySelector('.dropdown-wrapper');
    this.#renderBasedOnScreen();
    window.addEventListener('resize', this.#handleResize.bind(this));
  }
  static #handleResize() {
    const isMobile = window.innerWidth < 768;
    if (isMobile !== this._isMobile) {
      this.#renderBasedOnScreen();
    }
  }
  static #renderBasedOnScreen() {
    this._isMobile = window.innerWidth < 768;
    const listContainer = this._listContainer;
    const selectContainer = this._selectContainer;
    const categories = this._categories;
    const onCategoryClick = this._onCategoryClick;

    console.log(this._isMobile);
    if (this._isMobile) {
      selectContainer.classList.remove('no-display');
      listContainer.classList.add('no-display');
      selectContainer.innerHTML = `
    <select id="category-select" class="category-select" aria-label="book category">
      <option value="" disabled selected hidden>Categories</option>
      ${categories
        .map(c => `<option value="${c.list_name}">${c.list_name}</option>`)
        .join('')}
    </select>
  `;
      const select = selectContainer.querySelector('#category-select');
      onCategoryClick('All categories');
      select.addEventListener('change', e => {
        onCategoryClick(e.target.value);
      });
    } else {
      listContainer.classList.remove('no-display');
      selectContainer.classList.add('no-display');
      listContainer.innerHTML = categories
        .map(
          category => `
            <li
              class="filter-item ${
                category.list_name === 'All categories' ? 'active' : ''
              }"
              tabindex="0"
            >
              ${category.list_name}
            </li>
          `
        )
        .join('');
      listContainer.querySelectorAll('.filter-item').forEach(item => {
        item.addEventListener('click', () => {
          listContainer
            .querySelectorAll('.filter-item')
            .forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          onCategoryClick(item.dataset.category);
        });
      });
    }
  }
  static renderBooks(books, container) {
    if (!books?.length) {
      container.innerHTML = '<li class="no-books-message">No books found</li>';
      return;
    }
    container.innerHTML = books
      .map(book => this.#createBookCard(book))
      .join('');
  }
  static renderMoreBooks(books, container) {
    container.insertAdjacentHTML(
      'beforeend',
      books.map(book => this.#createBookCard(book)).join('')
    );
  }
  static #createBookCard(book) {
    return `
      <li class="book-item">
        <div class="book-image">
          ${
            book.book_image
              ? `<img src="${book.book_image}"
                  alt="${book.title} by ${book.author || 'Unknown Author'}"
                  loading="lazy"
                  onerror="this.src='img/no-image.png';">`
              : '<div class="no-image">No image available</div>'
          }
        </div>
        <div class="book-details">
          <div class="book-name-wrapper">
            <h3 class="book-title">${this.truncateText(book.title, 50)}</h3>
            <p class="book-author">${book.author || 'Unknown Author'}</p>
          </div>
          <p class="book-price">${book.price ? `$${book.price}` : 'N/A'}</p>
        </div>
        <button class="btn btn-secondary learn-more-btn" data-id="${
          book._id
        }">Learn More</button>
      </li>
    `;
  }
  static updateCounters(displayed, total, showingElement, totalElement) {
    showingElement.textContent = displayed;
    totalElement.textContent = total;
  }
  static toggleShowMoreButton(button, shouldShow) {
    button.classList.toggle('hidden', !shouldShow);
  }
  static truncateText(text, maxLength) {
    return text?.length > maxLength ? text.substring(0, maxLength) + '…' : text;
  }
}
