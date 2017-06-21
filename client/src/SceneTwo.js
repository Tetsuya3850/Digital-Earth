import React, { Component } from "react";
import { Link } from "react-router-dom";
import Earth from "./Earth";
import { initSSTEarth } from "./initEarths/initSSTEarth";
import "./CSS/App.css";

class SceneTwo extends Component {
  render() {
    return (
      <div>
        <Earth className="Earth" init={initSSTEarth} />
        <div id="info">
          <h2 style={{ textAlign: "center" }}>地球を巡る水、旅する水</h2>
          <hr />
          <br />
          <h4>
            黒潮の流れが赤く蛇行する流れとして示されていますが<br /><br />
            水温の高い暖流は、熱帯の海に溜まった<br /><br />
            太陽のエネルギーを運んでくる<br /><br />
            熱のベルトコンベアでもあるのです。
          </h4>
          <Link to="/2" style={{ textAlign: "right" }}>次へ</Link>
        </div>
      </div>
    );
  }
}

export default SceneTwo;
