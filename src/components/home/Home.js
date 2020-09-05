import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL_LIST_MOVIES } from "../../config";
import MovieGrid from "../../widgets/movie_grid";

function Home() {
  const [newMovies, setNewMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL_LIST_MOVIES}?sort_by=year&limit=4`, {
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((value) => {
        setNewMovies(value.data.data.movies);
      });
    axios
      .get(`${URL_LIST_MOVIES}?sort_by=rating&limit=4`, {
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((value) => {
        setTopRatedMovies(value.data.data.movies);
      });
    return () => {};
  }, []);

  return (
    <div>
      <MovieGrid movies={newMovies} title='New Movies' />
      <MovieGrid movies={topRatedMovies} title='Top Rated Movies' />
    </div>
  );
}

export default Home;
