import React, { useState, useEffect, Fragment } from "react";
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
  const [gifs, setGifs] = useState([]);
  const [gifsTags, setGifsTags] = useState(["hey", "funny", "tacos"]);
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
      .get(`/trending?limit=${pagination.limit}&offset=${pagination.offset}`)
      .then(response => {
        setSpinner(false);
        // handle success
        let res = response.data;
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
    axios
      .get(
        `/search?q=${query}&limit=${pagination.limit}&offset=${
          pagination.offset
        }`
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
  if (windowPercent >= 95 && windowPercent < 98) {
    setWindowPosition(0);
    if (searchStr) {
      searchHandler(searchStr);
    } else {
      trendingGifHandler();
    }
  }

  return (
    <Fragment>
      <div className="AppBackground" />

      <Wrapper>
        <div className="AppLogo">
          <Logo />
        </div>
        <Search val={searchStr} search={searchHandler} />
        <Tags
          goto={searchHandler}
          remove={removeTagHandler}
          gifsTags={gifsTags}
        />
      </Wrapper>
      <Wrapper>{spinner ? <Spinner /> : display}</Wrapper>
      <p>Powered By GIPHY</p>
    </Fragment>
  );
};

export default App;
