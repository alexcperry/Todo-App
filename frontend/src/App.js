import React from 'react';
import Todos from './components/Todos';
import Header from './components/layout/Header';

import './App.css';
import AddTodo from './components/AddTodo';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: []
    }
  }

  componentDidMount() {

    axios.get('http://localhost:3000/')
      .then(res => {
        this.setState({ todos: res.data });
      })
  }


  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo._id === id) {
          todo.completed = !todo.completed;

          const newTodo = { title: todo.title, completed: todo.completed }
          axios.post(`http://localhost:3000/update/${todo._id}`, newTodo);
        }
        return todo;
      })
    })
  }

  delTodo = id => {
    axios.get(`http://localhost:3000/delete/${id}`)
      .then(res => this.setState({ todos: res.data }));

    console.log(this.state.todos);
  }

  addTodo = title => {

    const newTodo = { title };

    axios.post('http://localhost:3000/add', newTodo)
      .then(res => {
        this.setState({ todos: [...this.state.todos, res.data] })
      });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="wrapper">
          <AddTodo addTodo={this.addTodo} />
          <Todos
            todos={this.state.todos}
            markComplete={this.markComplete}
            delTodo={this.delTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;
