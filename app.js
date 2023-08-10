require('dotenv').config()
const cors = require('cors')
const mysql = require('mysql2')
const express = require("express");
const app = express();
app.use(cors())
const port = process.env.PORT || 3001;

const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')

app.get("/", (req, res) => {
  connection.query('SELECT * FROM todos', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Database Error');
    } else {
      res.json(results);
    }
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

