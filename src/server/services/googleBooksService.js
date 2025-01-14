const axios = require("axios");

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

async function search(query) {
  try {
    const response = await axios.get(GOOGLE_BOOKS_API_URL, {
      params: { q: query, maxResults: 10 },
    });

    const books = response.data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      pageCount: item.volumeInfo.pageCount || 0,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
    }));

    return books;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    throw new Error("Erro ao buscar livros na API do Google Books");
  }
}

module.exports = { search };
