import React, { Component } from "react";
import { Link } from "react-router-dom";

function Description(props) {
  let nextLink = null;
  const nextNumber = Number(props.id) + 1;
  const nextID = props.scenario + nextNumber;
  if (props.id < props.length) {
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
      <h2 style={{ textAlign: "center" }}>{props.title}</h2>
      <hr />
      <br />
      <h4>
        {props.text}
      </h4>
      <div style={{ textAlign: "right" }}>
        {nextLink}
      </div>
    </div>
  );
}

export default Description;
