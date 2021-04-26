const User = require("../db/models/User");
const DB = require("../db/connection");
const bcrypt = require("bcrypt");

// Cadastro de usuários
async function create(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  // Validação de dados
  if (
    name &&
    email &&
    password &&
    confirmPassword &&
    password == confirmPassword
  ) {
    await User.create({ name, email, password });

    return res.redirect("/login");
  }

  // Renderização de página com erro
  return res.render("users/create", {
    error: "Dados inválidos",
    notLogged: true,
  });
}

// Realiza login do usuário
async function login(req, res) {
  const { email, password } = req.body;

  // Consulta do usuário via o email
  const user = await DB.get(
    `
    SELECT * FROM Users
      WHERE email = ?
  `,
    [email]
  );

  // Certifica que o usuário existe
  if (!user)
    return res.render("users/login", {
      error: "Email não cadastrado",
      notLogged: true,
    });

  // Comparação de senha
  const isCorrect = await bcrypt.compare(password, user.password);

  if (isCorrect) {
    req.session.isAuth = true;
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res.redirect("/books");
  }
  // Renderização de página com erro de login
  else {
    return res.render("users/login", {
      error: "Senha inválida",
      notLogged: true,
    });
  }
}

// Dá logout no usuário
function logout(req, res) {
  req.session.destroy();
  return res.redirect("/login");
}

module.exports = { create, login, logout };
