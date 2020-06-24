const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
let Todo = require('./models/todo.model.js');

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully!");
});

// Routing

// Read All Route - WORKING
app.get('/', (req, res) => {
  Todo.find()
    .then(todoList => res.json(todoList))
    .catch(err => res.status(400).json(`Error ${err}`));
});

//Read Route - WORKING
app.get('/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      res.json(todo);
    })
    .catch(err => res.status(400).json(`Error ${err}`));
})

// Create Route - WORKING
app.post('/add', (req, res) => {

  const newTodo = new Todo({
    title: req.body.title,
    completed: false,
  });

  newTodo.save()
    .then(() => res.json(newTodo))
    .catch(err => res.status(400).json(`Error ${err}`));
});

// Update Route - WORKING
app.post('/update/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      todo.title = req.body.title;
      todo.completed = req.body.completed;

      todo.save()
        .then(() => res.json('Todo updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Route - WORKING
app.get('/delete/:id', (req, res) => {

  Todo.findByIdAndDelete(req.params.id)
    .catch(err => res.status(400).json('Error: ' + err));

  Todo.find()
    .then(todoList => res.json(todoList))
    .catch(err => res.status(400).json('Error: ' + err));
})

// Listen on PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
})