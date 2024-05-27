const express = require('express');
const bodyParser = require('body-parser');
const logic = require('./logic');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public')); 



app.get('/', logic.getAllUsers);
app.get('/user/:id', logic.getUserById);
app.get('/edit/:id', logic.editUserForm);
app.post('/update/:id', logic.updateUser);
app.post('/delete/:id', logic.deleteUser);
app.get('/create', logic.createUserForm);
app.post('/create', logic.createUser);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
