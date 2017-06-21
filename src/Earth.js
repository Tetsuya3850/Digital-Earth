import React, { Component } from "react";
import "./CSS/App.css";

class Earth extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    return <div id="earthCanvas" />;
  }
}

export default Earth;
