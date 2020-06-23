import React from 'react';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import AddTodo from './components/AddTodo';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          id: uuidv4(),
          title: 'Pet dogs',
          completed: false,
        },
        {
          id: uuidv4(),
          title: 'Watch The Good Place',
          completed: false,
        },
        {
          id: uuidv4(),
          title: 'Learn React',
          completed: false,
        },
      ]
    }
  }


  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    })
  }

  delTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => { return todo.id !== id })
    })
  }

  addTodo = title => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    }
    this.setState({
      todos: [...this.state.todos, newTodo]
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="wrapper">
          <AddTodo addTodo={this.addTodo} />
          <Todos todos={this.state.todos} markComplete=
            {this.markComplete} delTodo={this.delTodo
            } />
        </div>
      </div>
    );
  }
}

export default App;
