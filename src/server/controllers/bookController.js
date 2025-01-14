const books = require("../data/books.json");
const googleBooksService = require("../services/googleBooksService");
const fs = require("fs");
const path = require("path");

// Busca livros na API do Google Books
async function searchBooks(req, res) {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query é obrigatória" });
    }

    const results = await googleBooksService.search(q);
    res.json(results);
  } catch (error) {
    console.error("Erro no controller:", error); // Adicionei log para debug
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
}
// Adiciona um livro à lista (salva no arquivo JSON)
function addBook(req, res) {
  const newBook = req.body;
  books.push(newBook);

  fs.writeFileSync(
    path.join(__dirname, "../data/books.json"),
    JSON.stringify(books, null, 2)
  );

  res.status(201).json(newBook);
}

// Lista todos os livros
function getBooks(req, res) {
  res.json(books);
}

// Remove um livro da lista
function deleteBook(req, res) {
  const { id } = req.params;
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Livro não encontrado" });
  }

  books.splice(index, 1);

  fs.writeFileSync(
    path.join(__dirname, "../data/books.json"),
    JSON.stringify(books, null, 2)
  );

  res.status(204).send();
}

module.exports = { searchBooks, addBook, getBooks, deleteBook };
