const up = (DB) => {
  DB.run(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      name TEXT NOT NULL,
      password NOT NULL
    )
  `);

  DB.run(`
    CREATE TABLE IF NOT EXISTS Books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      book TEXT NOT NULL,
      userId REFERENCES Users(id)
    )
  `);
};

const down = (DB) => {
  DB.run(` DROP TABLE Users`);
  DB.run(` DROP TABLE Books`);
};

module.exports = { up, down };
