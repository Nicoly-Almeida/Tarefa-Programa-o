const DB = require("../connection");
const fs = require("fs");
const path = require("path");

const action = process.argv[2];
const currentFileName = path.basename(__filename);

if (action == "up") {
  fs.readdirSync(__dirname).forEach((filename) => {
    if (filename != currentFileName)
      require(path.resolve(__dirname, filename)).up(DB);
  });
} else if (action == "down") {
  fs.readdirSync(__dirname).forEach((filename) => {
    if (filename != currentFileName)
      require(path.resolve(__dirname, filename)).down(DB);
  });
}
