import React, { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";

const Search = props => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchHandler = event => {
    setSearchQuery(event.target.value);
  };
  const makeReqHandler = () => {
    props.search(searchQuery);
    setSearchQuery("");
  };
  const keyPressedHandler = event => {
    if (event.key === "Enter") makeReqHandler();
  };
  return (
    <div className="SearchContainer">
      <Input
        keyPressed={keyPressedHandler}
        val={searchQuery}
        changed={searchHandler}
        attributes={{
          placeholder: "search for all GIFs",
          style: {
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0"
          }
        }}
      />
      <Button
        attributes={{
          style: {
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0"
          }
        }}
        disabled={!searchQuery}
        clicked={() => makeReqHandler()}
      >
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </div>
  );
};
export default Search;
