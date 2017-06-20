import React, { Component } from "react";
import { init } from "./initEarth";
import "./App.css";

class Earth extends Component {
  componentDidMount() {
    init();
  }

  render() {
    return <div id="earthCanvas" />;
  }
}

export default Earth;
