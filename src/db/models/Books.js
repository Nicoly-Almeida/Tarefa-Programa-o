const DB = require("../connection.js");

/**
 * Cria um novo livro
 * @param {{ title: string, book: string, userId: number }} data
 */
async function create(data) {
  const { lastId } = await DB.run(
    `
    INSERT INTO Books
      (title, book, userId)
    VALUES
      (?, ?, ?)
  `,
    [data.title, data.book, data.userId]
  );

  return lastId;
}

/**
 * Lista os livros de um dado usuário
 * @param {Number} userId
 */
async function listUserBooks(userId) {
  const bookList = await DB.all(
    `
    SELECT * FROM Books
      WHERE userId = ?
  `,
    [userId]
  );

  return bookList;
}

/**
 * Retorna informações de um livro específico
 * @param {Number} id
 */
async function get(id) {
  const book = await DB.get(
    `
    SELECT * FROM Books
      WHERE id = ?
  `,
    [id]
  );

  return book;
}

module.exports = { create, listUserBooks, get };
