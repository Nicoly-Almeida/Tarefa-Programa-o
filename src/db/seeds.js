const User = require("../models");

if (require.main === module) {
  User.create({
    id: 1,
    name: "admin",
    email: "admin@email.com",
    password: "admin",
  });
}
