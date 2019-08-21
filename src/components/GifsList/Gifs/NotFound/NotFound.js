import React from "react";
import gifNotFound from "../../../../assets/images/gifs/gifNotFound.gif";
import "./NotFound.css";
const NotFound = () => {
  return (
    <div className="NotFoundContainer">
      <h2 className="NotFoundText">NO GIF FOUND</h2>
      <img className="NotFoundImg" src={gifNotFound} alt="GIF NOT FOUND" />
    </div>
  );
};
export default NotFound;
