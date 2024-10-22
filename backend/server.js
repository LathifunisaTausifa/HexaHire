const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Surya@2003',
  database: 'hexa'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Endpoint to register a new user
app.post('/api/register', (req, res) => {
  const { fullName, email, password, role } = req.body;
  const query = 'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(query, [fullName, email, password, role], (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error registering user' });
    } else {
      res.status(200).send({ message: 'User registered successfully' });
    }
  });
});

// Endpoint to log in a user
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err || results.length === 0) {
      res.status(401).send({ message: 'Invalid credentials' });
    } else {
      res.status(200).send({ message: 'Login successful', user: results[0] });
    }
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
