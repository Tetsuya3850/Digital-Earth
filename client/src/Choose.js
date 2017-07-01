import React, { Component } from "react";
import { Link } from "react-router-dom";
import Scene from "./Scene";
import "./CSS/App.css";
import banner from "./Visuals/banner.png";
import ocean from "./Visuals/ocean.jpg";
import history from "./Visuals/history.jpeg";
import city from "./Visuals/city.jpg";
import co2 from "./Visuals/co2.jpg";
import forest from "./Visuals/forest.jpeg";

class Choose extends Component {
  render() {
    return (
      <div className="grid">
        <div className="box1">
          <Link to={"/"}>
            <img src={banner} />
            <h1 className="banner">Choose a Story</h1>
          </Link>
        </div>

        <div>
          <img src={ocean} />
          <p>Ocean</p>
        </div>
        <div>
          <img src={history} />
          <p>Big <br /> History</p>
        </div>
        <div>
          <img src={city} />
          <p>City</p>
        </div>
        <div>
          <img src={co2} />
          <p>Global <br /> Warming</p>
        </div>
        <div>
          <img src={forest} />
          <p>Forest</p>
        </div>
      </div>
    );
  }
}

export default Choose;
