const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'vindhya',
  database: 'projectdb',
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');
}); 

module.exports = connection;