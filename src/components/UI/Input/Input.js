import React from "react";
import "./Input.css";

const input = props => {
  return (
    <input
      onKeyPress={props.keyPressed}
      onChange={props.changed}
      value={props.val}
      {...props.attributes}
      className="Input"
      type="text"
    />
  );
};
export default input;
