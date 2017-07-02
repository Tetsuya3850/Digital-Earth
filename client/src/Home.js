import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CSS/App.css";
import top from "./Visuals/top.mp4";

class Home extends Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: "center", opacity: "0.7" }}>
          <video width="100%" autoPlay loop>
            <source src={top} type="video/mp4" />
          </video>
          <div id="home__title">Earth Museum</div>
          <div id="home__description">
            Revisit Our Planet from a Whole New Perspective
          </div>
          <Link to="/entry">
            <div id="home__explore">
              Explore
              <br />
              ↓
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
