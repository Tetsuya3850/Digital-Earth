import React, { Component } from "react";
import { Link } from "react-router-dom";

class Description extends Component {
  render() {
    const nextId = Number(this.props.id) + 1;
    return (
      <div id="info">
        <h2 style={{ textAlign: "center" }}>{this.props.title}</h2>
        <hr />
        <br />
        <h4>
          {this.props.text}
        </h4>
        <Link to={"/" + nextId} style={{ textAlign: "right" }}>
          次へ
        </Link>
      </div>
    );
  }
}

export default Description;
