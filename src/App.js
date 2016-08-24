import React, { Component } from 'react';
import Wegschicker from './Wegschicker'

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Poke-Wegschicker</h1>
		  <h2><small>Wieviele Pokemon kann ich wegschicken, um so viele Entwicklungen machen zu können, wie möglich?</small></h2>
        </div>
		<Wegschicker />
      </div>
    );
  }
}

export default App;
