import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import Search from "../../components/Search/Search";
import NotFound from "../../components/GifsList/Gifs/NotFound/NotFound";
import Logo from "../../components/Logo/Logo";
import GifsList from "../../components/GifsList/GifsList";
import Tags from "../../components/Tags/Tags";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import Spinner from "../../components/UI/Spinner/Spinner";
const App = () => {
  const myKey = "QaTaTpn5xJGGG1Wktc0Gq6CEhsiSz2R3";
  const [gifs, setGifs] = useState([]);
  const [gifsTags, setGifsTags] = useState(["hey", "funny", "love"]);
  const [searchStr, setSearchStr] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [windowPosition, setWindowPosition] = useState(0);
  const [error, setError] = useState({
    show: false,
    notFound: false,
    message: ""
  });
  const [pagination, setPagination] = useState({
    limit: 40,
    offset: 0
  });

  const paginationHandler = (res, currentSearchStr) => {
    setGifs([...gifs, [...res.data]]);
    //overwrite setGifs if new search
    if (searchStr !== currentSearchStr) setGifs([[...res.data]]);

    setPagination({
      ...pagination,
      offset: pagination.limit + pagination.offset
    });
  };
  const trendingGifHandler = () => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/trending?api_key=${myKey}&limit=${
          pagination.limit
        }&offset=${pagination.offset}`
      )
      .then(response => {
        setSpinner(false);
        // handle success
        let res = response.data;
        console.log(res);
        paginationHandler(res, "");
      })
      .catch(err => {
        setSpinner(false);

        setError({
          show: true,
          message: `Oops! We couldn't connect with the servers`
        });
      });
  };

  const searchHandler = query => {
    console.log(`search for: ${query}`);

    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=${myKey}&q=${query}&limit=${
          pagination.limit
        }&offset=${pagination.offset}`
      )
      .then(response => {
        setSpinner(false);

        // handle success
        let res = response.data;

        if (res.data.length > 0) {
          //if there are gifs then...
          setError({
            show: false
          });
          paginationHandler(res, query);
          setSearchStr(query);
          let copyTagsArr = gifsTags;
          //search if there is a similar item on the array, if not add it.
          if (copyTagsArr.filter(item => item === query).length === 0)
            setGifsTags([...gifsTags, query]);
        } else {
          //if there are no gifs show error.
          setError({
            show: true,
            notFound: true,
            message: `Oops! No results were found for ${query}. Try searching for another thing.`
          });
        }
      })
      .catch(err => {
        setSpinner(false);

        setError({
          show: true,
          message: `Oops! We couldn't connect with the servers`
        });
      });
  };

  const removeTagHandler = query => {
    setGifsTags([...gifsTags].filter(item => item !== query));
  };

  useEffect(() => {
    //get the trending gifs
    trendingGifHandler();
    window.addEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = winScroll / height;
    console.log(scrolled);

    setWindowPosition(scrolled);
  };

  let display = <GifsList gifsList={gifs} />;
  if (error.show) {
    display = <div className="AppError">{error.message}</div>;
  }
  if (error.notFound) {
    display = <NotFound />;
  }
  let windowPercent = (windowPosition * 100).toFixed(2);
  if (windowPercent >= 100) {
    if (searchStr) {
      searchHandler(searchStr);
    } else {
      trendingGifHandler();
    }
  }

  return (
    <div className="App">
      <div className="AppBackground" />
      <Logo />
      <Wrapper>
        <Search val={searchStr} search={searchHandler} />
        <Tags
          goto={searchHandler}
          remove={removeTagHandler}
          gifsTags={gifsTags}
        />
      </Wrapper>
      <Wrapper>{spinner ? <Spinner /> : display}</Wrapper>
      <p>Powered By GIPHY</p>
    </div>
  );
};

export default App;
