import React, { Component } from 'react'

export class AddTodo extends Component {

  state = {
    title: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    console.log(e.target.name);
    console.log(e.target.value);
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: '' });
    console.log('please');
  }

  render() {
    return (
      <form style={{ display: 'flex' }} onSubmit={this.onSubmit}>
        <input
          type="text"
          name="title"
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add Todo..."
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="submit"
          className="btn"
          style={{ flex: '1' }}
        />
      </form>
    )
  }
}

export default AddTodo
