const express = require("express");
const multer = require("multer");
const config = require("./config");
const booksController = require("./controllers/BooksController");
const usersController = require("./controllers/UsersController");
const { authRequired } = require("./middlewares/auth");

const routes = express.Router();
const upload = multer(config.multerConfig);

function renderScreen(page, obj) {
  return (req, res) => res.render(page, obj);
}

routes.get("/", (req, res) => res.redirect("/home")); // 
routes.get("/home", (req, res) => res.render("home", {notLogged: !req.session.isAuth}));

routes.get("/login", renderScreen("users/login", { notLogged: true }));
routes.get("/sign-up", renderScreen("users/create", { notLogged: true }));
routes.post("/login", usersController.login);
routes.post("/sign-up", usersController.create);
routes.get("/logout", authRequired, usersController.logout);

routes.get("/books", authRequired, booksController.list);
routes.get("/books/register", authRequired, renderScreen("books/create"));
routes.post(
  "/books/register",
  authRequired,
  upload.single("book"),
  booksController.create
);


module.exports = routes;
