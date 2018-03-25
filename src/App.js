import React, { Component } from 'react';
import './css/App.css';
import TimerController from "./Timer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stopwatch</h1>
        </header>
        <div className="App-intro">
            <TimerController/>
        </div>
      </div>
    );
  }
}

export default App;
