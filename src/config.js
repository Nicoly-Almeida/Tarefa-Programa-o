const { diskStorage } = require("multer");
const { resolve } = require("path");

// Objeto de configuração do multer (para uploads de arquivos estáticos)
const multerConfig = {
  storage: diskStorage({
    destination: resolve(__dirname, "uploads"),
    filename: (request, file, callback) => {
      callback(null, Date.now() + "-" + file.originalname);
    },
  }),
};

// Configuração do sistema de autenticação
const authConfig = { secret: "senha", resave: true, saveUninitialized: true };

module.exports = { multerConfig, authConfig };
