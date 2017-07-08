import React from "react";
import Earth from "./Earth";
import Description from "./Description";
import "./CSS/App.css";

function Scene(props) {
  return (
    <div>
      <Earth
        className="Earth"
        lon={props.lon}
        lat={props.lat}
        global={props.global}
        loop={props.loop}
        width={props.width}
        height={props.height}
      />
      <Description
        id={props.id}
        scenario={props.scenario}
        title={props.title}
        text={props.text}
        length={props.length}
      />
    </div>
  );
}

export default Scene;
