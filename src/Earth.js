import React, { Component } from "react";
import "./App.css";
import { init } from "./initEarth";

class Earth extends Component {
  componentDidMount() {
    init();
  }

  render() {
    return <div />;
  }
}

export default Earth;
