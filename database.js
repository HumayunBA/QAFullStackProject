const sqlite3 = require('sqlite3').verbose();
const mydb = new sqlite3.Database(':memory:');

mydb.serialize(() => {
  mydb.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, nickname TEXT, age INTEGER, bio TEXT)");
});

module.exports = mydb;
