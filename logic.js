const database = require('./database');
const path = require('path');

// Function to get all users
const getAllUsers = (req, res) => {
  database.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Failed to fetch users');
    } else {
      res.json(results); 
    }
  });
};

// Function to get a user by ID
const getUserById = (req, res) => {
  const userId = req.params.id;
  database.query('SELECT * FROM Users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user by ID:', err);
      res.status(500).send('Failed to fetch user');
    } else if (results.length === 0) {
      res.status(404).send('User not found');
    } else {
      res.json(results[0]); 
    }
  });
};

// Function to render the create user form
const createUserForm = (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create.html'));
};

// Function to create a new user
const createUser = (req, res) => {
  const { name, nickname, age, bio } = req.body;
  database.query('INSERT INTO Users (name, nickname, age, bio) VALUES (?, ?, ?, ?)', [name, nickname, age, bio], (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).send('Failed to create user');
    } else {
      res.redirect('/');
    }
  });
};

// Function to render the edit user form
const editUserForm = (req, res) => {
  const userId = req.params.id;
  database.query('SELECT * FROM Users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user for editing:', err);
      res.status(500).send('Failed to fetch user for editing');
    } else if (results.length === 0) {
      res.status(404).send('User not found');
    } else {
      res.sendFile(path.join(__dirname, 'public', 'edit.html'));
    }
  });
};

// Function to update a user
const updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, nickname, age, bio } = req.body;
  database.query('UPDATE Users SET name = ?, nickname = ?, age = ?, bio = ? WHERE id = ?', [name, nickname, age, bio, userId], (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).send('Failed to update user');
    } else {
      res.redirect('/');
    }
  });
};

// Function to delete a user
const deleteUser = (req, res) => {
  const userId = req.params.id;
  database.query('DELETE FROM Users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Failed to delete user');
    } else {
      res.sendStatus(200);
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
