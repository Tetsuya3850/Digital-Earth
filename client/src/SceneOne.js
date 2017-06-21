import React, { Component } from "react";
import Earth from "./Earth";
import Description from "./Description";
import "./CSS/App.css";
import vapor from "./Visuals/earthvapor.mp4";

class SceneOne extends Component {
  render() {
    return (
      <div>
        <Earth className="Earth" lon="30" lat="135" global={vapor} />
        <Description
          title="水惑星の奇跡"
          text="地球は、宇宙の中でも珍しい、水に満ち溢れた星です。水分子(H2O)は宇宙にあまねく存在しますが、それが液体の状態で「海」を形成している星は、宇宙の中でも極めて稀です。"
        />
      </div>
    );
  }
}

export default SceneOne;
