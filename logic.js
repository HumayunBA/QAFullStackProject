const database = require('./database');

// Function to get all users
const getAllUsers = (req, res) => {
  database.query('SELECT * FROM Users', (err, results) => {
    if (err) throw err;
    res.render('index', { users: results });
  });
};

// Function to get a user by ID
const getUserById = (req, res) => {
  const userId = req.params.id;
  database.query('SELECT * FROM Users WHERE id = ?', [userId], (err, results) => {
    if (err) throw err;
    res.render('profile', { user: results[0] });
  });
};

// Function to render the create user form
const createUserForm = (req, res) => {
  res.render('create');
};

// Function to create a new user
const createUser = (req, res) => {
  const { name, nickname, age, bio } = req.body;
  database.query('INSERT INTO Users (name, nickname, age, bio) VALUES (?, ?, ?, ?)', [name, nickname, age, bio], (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
};

// Function to render the edit user form
const editUserForm = (req, res) => {
  const userId = req.params.id;
  database.query('SELECT * FROM Users WHERE id = ?', [userId], (err, results) => {
    if (err) throw err;
    res.render('edit', { user: results[0] });
  });
};



// Function to update a user
const updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, nickname, age, bio } = req.body;
  database.query('UPDATE Users SET name = ?, nickname = ?, age = ?, bio = ? WHERE id = ?', [name, nickname, age, bio, userId], (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
};

// Function to delete a user
const deleteUser = (req, res) => {
  const userId = req.params.id;
  database.query('DELETE FROM Users WHERE id = ?', [userId], (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUserForm,
  createUser,
  editUserForm,
  updateUser,
  deleteUser
};

