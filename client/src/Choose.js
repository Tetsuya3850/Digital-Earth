import React, { Component } from "react";
import { Link } from "react-router-dom";
import Scene from "./Scene";
import "./CSS/App.css";
import ocean from "./Visuals/ocean.jpg";
import history from "./Visuals/history.jpeg";
import city from "./Visuals/city.jpg";
import co2 from "./Visuals/co2.jpg";
import forest from "./Visuals/forest.jpeg";

class Choose extends Component {
  render() {
    return (
      <div className="grid">
        <div>
          <img src={ocean} />
        </div>
        <div>
          <img src={history} />
        </div>
        <div>
          <img src={city} />
        </div>
        <div>
          <img src={co2} />
        </div>
        <div>
          <img src={forest} />
        </div>
      </div>
    );
  }
}

export default Choose;
