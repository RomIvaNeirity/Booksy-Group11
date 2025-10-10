export default class BooksAPI {
  static BASE_URL = 'https://books-backend.p.goit.global/books';

  static async fetchCategories() {
    return this.#fetchData('/category-list', 'Error fetching categories');
  }

  static async fetchTopBooks() {
    return this.#fetchData('/top-books', 'Error fetching top books');
  }

  static async fetchBooksByCategory(category) {
    return this.#fetchData(
      `/category?category=${encodeURIComponent(category)}`,
      'Error fetching books by category'
    );
  }

  static async fetchBookById(bookId) {
    return this.#fetchData(`/${bookId}`, 'Error fetching book by ID');
  }

  static async #fetchData(endpoint, errorMessage) {
    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`);
      console.log(`[FETCH] ${this.BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(`${errorMessage}: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(errorMessage, error);
      throw error;
    }
  }
}
