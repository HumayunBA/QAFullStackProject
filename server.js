const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logic = require('./logic');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'create.html'));
});

app.get('/edit/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'edit.html'));
});

app.get('/api/users', (req, res) => {
    logic.getUsers((err, users) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.json(users);
    });
});

app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    logic.getUserById(userId, (err, user) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.json(user);
    });
});

app.post('/api/users', (req, res) => {
    const { name, nickname, age, bio } = req.body;
    logic.createUser({ name, nickname, age, bio }, (err) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.status(201).send('User created');
    });
});

app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, nickname, age, bio } = req.body;
    logic.updateUser(userId, { name, nickname, age, bio }, (err) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.send('User updated');
    });
});

app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    logic.deleteUser(userId, (err) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.send('User deleted');
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
