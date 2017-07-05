import React, { Component } from "react";
import { Link } from "react-router-dom";

class Description extends Component {
  render() {
    let nextLink = null;
    const nextNumber = Number(this.props.id) + 1;
    const nextID = this.props.scenario + nextNumber;
    if (this.props.id < this.props.length) {
      nextLink = (
        <Link to={"/" + nextID} style={{ color: "white" }}>
          次へ→
        </Link>
      );
    } else {
      nextLink = <Link to={"/entry"} style={{ color: "white" }}>戻る</Link>;
    }

    return (
      <div id="info">
        <h2 style={{ textAlign: "center" }}>{this.props.title}</h2>
        <hr />
        <br />
        <h4>
          {this.props.text}
        </h4>
        <div style={{ textAlign: "right" }}>
          {nextLink}
        </div>
      </div>
    );
  }
}

export default Description;
