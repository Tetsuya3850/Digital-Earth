import React, { Component } from "react";
import Earth from "./Earth";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Earth />
        <div id="info">
          <h2>海は地球表面の約7割を占める</h2>
          <h4>あ</h4>
        </div>
      </div>
    );
  }
}

export default App;
