import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      inputValue: ""
    }
  }

  handleInput = event =>{
    const {value} = event.target;
    this.setState({
      inputValue: value
      });
  }
  addTask = () => {
    console.log(this.state.inputValue);
    this.setState(prevState => ({
      tasks: [...prevState.tasks, this.state.inputValue]
    }))
  }


  render() {
    const {inputValue, tasks} = this.state;
    return (
      <div className="wrapper">
          <input
            type="text"
            onChange={this.handleInput}
            value={this.state.inputValue}
          />
          <button onClick={this.addTask}>Add task</button>
        <div>{inputValue}</div>
        <ul>
          {tasks.map(item => {
            return <li>{item}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
