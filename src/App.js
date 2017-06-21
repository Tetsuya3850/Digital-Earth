import React, { Component } from "react";
import Earth from "./Earth";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Earth className="Earth" />
        <div id="info">
          <h2 style={{ textAlign: "center" }}>水惑星の奇跡</h2>
          <hr />
          <br />
          <h4>
            地球は、宇宙の中でも珍しい、水に満ち溢れた星です。<br /><br />
            水分子(H2O)は宇宙にあまねく存在しますが、<br /><br />
            それが液体の状態で「海」を形成している星は、<br /><br />
            宇宙の中でも極めて稀です。
          </h4>
        </div>
      </div>
    );
  }
}

export default App;
