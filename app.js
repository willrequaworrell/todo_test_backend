require('dotenv').config()
const cors = require('cors')
const mysql = require('mysql2')
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
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

app.post("/todos", (req, res) => {
    const newTodo = req.body;

    connection.query('INSERT INTO todos SET ?', newTodo, (err, result) => {
		if (err) {
			console.error('Error executing query:', err);
			res.status(500).send('Database Error');
		} else {
		// Assuming you want to return the newly created todo with its auto-generated id
			console.log('successfully added todo!')
			const insertedId = result.insertId;
			connection.query('SELECT * FROM todos WHERE id = ?', [insertedId], (err, todo) => {
				if (err) {
					console.error('Error fetching new todo:', err);
					res.status(500).send('Database Error');
				} else {
					console.log(todo[0])
					res.status(201).json(todo[0]);
				}
			});
		}
    });
});

app.delete("/todos/:id", (req, res) => {
	const todoId = req.params.id;

	connection.query('DELETE FROM todos WHERE id = ?', [todoId], (err, result) => {
		if (err) {
			console.error('Error executing query:', err);
			res.status(500).send('Database Error');
		} else {
			console.log('successfully deleted')
			res.status(204).send(); // No content response for successful deletion
		}
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

