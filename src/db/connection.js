const path = require("path");
const Database = require("sqlite-async");

// Cria conexão do banco de dados
async function connection() {
  return await Database.open(path.resolve(__dirname, "database.sqlite"));
}

// Chama função GET do banco de dados
async function get(sql, list) {
  const db = await connection();
  const data = await db.get(sql, list);
  db.close();
  return data;
}

// Chama função ALL do banco de dados
async function all(sql, list) {
  const db = await connection();
  const data = await db.all(sql, list);
  db.close();
  return data;
}

// Chama função RUN do banco de dados
async function run(sql, list) {
  const db = await connection();
  const data = await db.run(sql, list);
  db.close();
  return data;
}

module.exports = { connection, get, run, all };
