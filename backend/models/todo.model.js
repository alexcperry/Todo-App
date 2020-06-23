const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  id: { type: String, required: true, unique: true, },
  title: { type: String, required: true, trim: true, minlength: 1, },
  completed: { type: Boolean, required: true, },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;