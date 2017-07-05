import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CSS/App.css";
import banner from "./Visuals/banner.png";
const ocean = require("./Visuals/ocean.jpg");
const history = require("./Visuals/history.jpeg");
const city = require("./Visuals/city.jpg");
const coo = require("./Visuals/co2.jpg");
const forest = require("./Visuals/forest.jpeg");

class Entry extends Component {
  render() {
    const entries = this.props.entries.map(entry =>
      <div key={entry.id}>
        <Link to={"/" + entry.imageID + 1}>
          <img src={eval(entry.imageID)} alt={entry.imageID} />
          <p>{entry.title}</p>
        </Link>
      </div>
    );

    return (
      <div className="grid">
        <div className="box1">
          <Link to={"/"}>
            <img src={banner} alt="banner" />
            <h1 className="banner">Choose a Story</h1>
          </Link>
        </div>
        {entries}
      </div>
    );
  }
}

export default Entry;
