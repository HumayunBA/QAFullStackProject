const db = require('./database');

module.exports = {
  getUsers(callback) {
    db.all("SELECT * FROM users", callback);
  },
  getUserById(id, callback) {
    db.get("SELECT * FROM users WHERE id = ?", id, callback);
  },
  createUser(user, callback) {
    const { name, nickname, age, bio } = user;
    db.run("INSERT INTO users (name, nickname, age, bio) VALUES (?, ?, ?, ?)", [name, nickname, age, bio], callback);
  },
  updateUser(id, user, callback) {
    const { name, nickname, age, bio } = user;
    db.run("UPDATE users SET name = ?, nickname = ?, age = ?, bio = ? WHERE id = ?", [name, nickname, age, bio, id], callback);
  },
  deleteUser(id, callback) {
    db.run("DELETE FROM users WHERE id = ?", id, callback);
  }
};
