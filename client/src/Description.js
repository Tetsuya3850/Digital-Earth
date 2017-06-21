import React, { Component } from "react";
import { Link } from "react-router-dom";

class Description extends Component {
  render() {
    let nextLink = null;
    const nextId = Number(this.props.id) + 1;
    if (this.props.id < this.props.length) {
      nextLink = (
        <Link to={"/" + nextId} style={{ textAlign: "right" }}>
          次へ
        </Link>
      );
    } else {
      nextLink = <Link to={"/"}>ホームに戻る</Link>;
    }

    return (
      <div id="info">
        <h2 style={{ textAlign: "center" }}>{this.props.title}</h2>
        <hr />
        <br />
        <h4>
          {this.props.text}
        </h4>
        {nextLink}
      </div>
    );
  }
}

export default Description;
