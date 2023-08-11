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

app.delete("/todos/:id", (req, res) => {
  const todoId = req.params.id;

  connection.query('DELETE FROM todos WHERE id = ?', [todoId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Database Error');
    } else {
      res.status(204).send(); // No content response for successful deletion
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

