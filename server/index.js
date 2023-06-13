const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2")

app.use(cors());
app.use(express());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "8802",
    database: "taskmanager",

})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/api/post', (req, res) => {
    console.log(req.body);
    const { title, content } = req.body;
    console.log("data", title, content)
    const sql = 'INSERT INTO tasks (title, content) VALUES (?, ?)';
    connection.query(sql, [title, content], (err, result) => {
        if (err) {
            console.error('Error saving task: ', err);
            res.status(500).json({ error: 'Error saving task' });
            return;
        }
        res.status(200).json({ message: 'Task saved successfully' });
    });
});

// Define a route to get all tasks
app.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving tasks: ', err);
            res.status(500).json({ error: 'Error retrieving tasks' });
            return;
        }
        res.status(200).json(result);
    });
});




const port = 8000;
app.listen(port, () => {
    console.log("Server is running on port ", port);
})