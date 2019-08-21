import React from "react";
import Gifs from "../../components/GifsList/Gifs/Gifs";
import "./GifsList.css";
const GifsList = props => {
  return (
    <div className="GifsListContainer">
      {props.gifsList.map((item, index) => (
        <Gifs className="GifsList" key={index} gifs={item} />
      ))}
    </div>
  );
};
export default GifsList;
