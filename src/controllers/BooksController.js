const Books = require("../db/models/Books");

// Cadastro de livro
async function create(req, res) {
  const { title } = req.body;
  const book = req.file.filename;
  const userId = req.session.user.id;

  // Validação de dados
  if (title && book) {
    await Books.create({ title, book, userId });

    return res.redirect("/books");
  }
  return res.render("books/create", { error: "Dados inválidos" });
}

// Listagem de livros do usuários logado
async function list(req, res) {
  const userId = req.session.user.id;
  const result = await Books.listUserBooks(userId);

  const books = result.map((data) => ({
    id: data.id,
    title: data.title,
    book: data.book,
    link: `http://localhost:8043/uploads/${data.book}`,
  }));

  return res.render("books/list", { books });
}



module.exports = { create, list};
