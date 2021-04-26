// Middleware de autenticação
const authRequired = (req, res, next) => {
  if (req.session.isAuth) return next();
  else return res.redirect("/login");
};

// AMiddleware de ativação de sessão local
const activeLocalSession = (req, res, next) => {
  res.locals.session = req.session;
  return next();
};

module.exports = { authRequired, activeLocalSession };
