import React, { Component } from "react";
import Earth from "./Earth";
import Description from "./Description";
import "./CSS/App.css";

class Scene extends Component {
  render() {
    return (
      <div>
        <Earth
          className="Earth"
          lon={this.props.lon}
          lat={this.props.lat}
          global={this.props.global}
          loop={this.props.loop}
          width={this.props.width}
          height={this.props.height}
        />
        <Description
          id={this.props.id}
          scenario={this.props.scenario}
          title={this.props.title}
          text={this.props.text}
          length={this.props.length}
        />
      </div>
    );
  }
}

export default Scene;
