const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uuid = require('uuid');
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
app.get('/', (req, res) => {
  Todo.find()
    .then(todoList => res.json(todoList))
    .catch(err => res.status(400).json(`Error ${err}`));
});

app.post('/add', (req, res) => {
  const newTodo = new Todo({
    id: uuid.v4(),
    title: req.body.title,
    completed: false,
  });

  newTodo.save()
    .then(() => res.json('Added todo!'))
    .catch(err => res.status(400).json(`Error ${err}`));

})


// Listen on PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
})