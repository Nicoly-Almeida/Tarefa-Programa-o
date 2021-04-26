const bcrypt = require("bcrypt");
const DB = require("../connection");

/**
 * Cadastra um novo usuário
 * @param {{ name: string, email: string, password: string }} data
 */
async function create(data) {
  const { name, email, password } = data;

  const hash = await bcrypt.hash(password, 10);

  const { lastId } = await DB.run(
    `
    INSERT INTO Users
      (name, email, password)
    VALUES
      (?, ?, ?)
  `,
    [name, email, hash]
  );

  return lastId;
}

module.exports = { create };
