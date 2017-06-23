import React, { Component } from "react";
import Earth from "./Earth";
import Description from "./Description";
import "./CSS/App.css";

class Home extends Component {
  render() {
    return (
      <div>
        <Earth
          className="Earth"
          lon="30"
          lat="135"
          global={this.props.global}
          loop="true"
        />
        <div id="home">
          地球ミュージアム
        </div>
      </div>
    );
  }
}

export default Home;
