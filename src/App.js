import React, { Component } from "react";
import Earth from "./Earth";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Earth />
        <div id="info">
          海は地球表面の約7割を占める。
        </div>
      </div>
    );
  }
}

export default App;
