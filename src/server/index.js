const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/books");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
