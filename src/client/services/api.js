import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const searchBooks = (query) => {
  return api.get(`/books/search?q=${encodeURIComponent(query)}`);
};

export const getBooks = () => {
  return api.get("/books");
};

export const addBook = (bookData) => {
  return api.post("/books", bookData);
};

export const deleteBook = (bookId) => {
  return api.delete(`/books/${bookId}`);
};
