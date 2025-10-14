import axios from 'axios';

export default class BooksAPI {
  static axiosInstance = axios.create({
    baseURL: 'https://books-backend.p.goit.global',
    timeout: 10000,
  });

  static async fetchCategories() {
    const { data } = await this.axiosInstance.get('/books/category-list');
    return data;
  }

  static async fetchTopBooks() {
    const { data } = await this.axiosInstance.get('/books/top-books');
    return data;
  }

  static async fetchBooksByCategory(category) {
    const { data } = await this.axiosInstance.get('/books/category', {
      params: { category },
    });
    return data;
  }

  static async fetchBookById(bookId) {
    const { data } = await this.axiosInstance.get(`/books/${bookId}`);
    return data;
  }
}
