import React, { Component } from 'react';
import Wegschicker from './Wegschicker'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Poke-Wegschicker</h1>
		  <p>Wieviele Pokemon kann ich wegschicken, um so viele Entwicklungen machen zu können, wie möglich?</p>
        </div>
		<Wegschicker />
      </div>
    );
  }
}

export default App;
