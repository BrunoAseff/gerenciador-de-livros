const express = require("express");
const router = express.Router();
const {
  searchBooks,
  addBook,
  getBooks,
  deleteBook,
} = require("../controllers/bookController");

router.get("/search", searchBooks); // Busca livros usando a apido Google Books
router.post("/", addBook); // Adiciona
router.get("/", getBooks); // Lista todos os livros
router.delete("/:id", deleteBook); // Remove

module.exports = router;
