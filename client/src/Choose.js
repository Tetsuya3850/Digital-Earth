import React, { Component } from "react";
import { Link } from "react-router-dom";
import Scene from "./Scene";
import "./CSS/App.css";
import ocean from "./Visuals/ocean.jpg";

class Choose extends Component {
  render() {
    return (
      <div className="grid">
        <div>
          <img src={ocean} />
        </div>
        <div>
          <img src={ocean} />
        </div>
        <div>
          <img src={ocean} />
        </div>
        <div>
          <img src={ocean} />
        </div>
        <div>
          <img src={ocean} />
        </div>
      </div>
    );
  }
}

export default Choose;
