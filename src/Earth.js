import React, { Component } from "react";
import { initVaporEarth } from "./initVaporEarth";
import "./App.css";

class Earth extends Component {
  componentDidMount() {
    initVaporEarth();
  }

  render() {
    return <div id="earthCanvas" />;
  }
}

export default Earth;
