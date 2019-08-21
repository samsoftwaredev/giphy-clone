import React from "react";
import "./Gifs.css";

const gifs = props => {
  return (
    <div className="GifContainer">
      {props.gifs.map(item => {
        return (
          <section className="GifContainerDisplay" key={item.id}>
            <img
              className="GifDisplay"
              alt={item.title}
              src={item.images.preview_gif.url}
            />
          </section>
        );
      })}
    </div>
  );
};
export default gifs;
