import React from "react";
import "./Tags.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Tags = props => {
  return (
    <ul className="TagsContainer">
      {props.gifsTags.map((item, index) => (
        <li className="Tags" key={index}>
          <span onClick={() => props.goto(item)}>{item}</span>{" "}
          <span onClick={() => props.remove(item)}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </span>
        </li>
      ))}
    </ul>
  );
};
export default Tags;
