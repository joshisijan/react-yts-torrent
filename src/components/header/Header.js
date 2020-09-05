import React, { useState } from "react";

import { Menu, Search, Close } from "@material-ui/icons";

import axios from "axios";

import { URL_LIST_MOVIES } from "../../config";

import "./header.css";
import MovieGrid from "../../widgets/movie_grid";

//TODO: active link style needed to add

const Header = (props) => {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [count, setCount] = useState(0);

  const inputChangeHandler = (event) => {
    event.preventDefault();
    setQuery(event.target[0].value.trim());
  };

  const closeSearch = () => {
    setQuery("");
  };

  const showSearch = () => {
    if (query.trim().length <= 0) {
      return null;
    } else {
      axios
        .get(
          encodeURI(`${URL_LIST_MOVIES}?query_term=${query}`, {
            withCredentials: false,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          })
        )
        .then((value) => {
          if (value.data.data.movie_count > 0) {
            setCount(value.data.data.movie_count);
            setSearchResult(value.data.data.movies);
          } else setSearchResult([]);
        });

      // if (searchResult.length <= 0) {
      //   return <div className='search__container__empty'>No movie found!</div>;
      // }
      // return searchResult.map((movie) => {
      //   return <div key={movie.id}><h1>{movie.title_long}</h1></div>;
      // });
      return (
        <MovieGrid
          movies={searchResult}
          title={count.toString() + " movies found"}
          movies_count={count}
        />
      );
    }
  };

  return (
    <div className='header__bottom__fixer'>
      <div className='search'>
        <div className='header'>
          <Menu className='header__menu' fontSize='large' />
          <div style={{ width: "20px" }}></div>
          <form className='header__form' onSubmit={inputChangeHandler}>
            <input type='text' />
            <button className='header__button'>
              <Search />
            </button>
          </form>
        </div>
        <div
          className={
            query.length > 0 ? "search__container" : "unsearch__container"
          }>
          <div className='search__container__title'>
            Search result for {query}:
            <Close
              className='search__container__title__close'
              fontSize='large'
              onClick={closeSearch}
            />
          </div>
          {query.length > 0 ? showSearch() : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
