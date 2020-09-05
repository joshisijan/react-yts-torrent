import React from 'react'

import './movie_grid.css'
import { Link } from 'react-router-dom';

import {
  StarRate
} from '@material-ui/icons';

function MovieGrid(props) {

  const showMovies = () => {
    if(props.movies_count === 0){
      return null;
    }
    if(props.movies.length <= 0){
      return (
        <div className="movie__list__loading">
          Loading...
        </div>
      );
    }else{
      return props.movies.map((movie) => {
        return (
          <Link key={movie.id} to="/">
            <div className="movie__list__item" style={{
            'backgroundImage': `url(${movie.medium_cover_image})`,
            'backgroundRepeat': 'no-repeat',
            'backgroundPosition': 'center',
            'backgroundSize': 'cover',
          }} 
          >
            <div className="movie__list_item__mask"></div>
            <div className="movie__list_item__rating">
            <StarRate /> <br />
             {movie.rating} / 10
            </div>
            <div className="movie__list__item__title">
              {movie.title_long}
            </div>
          </div>
          </Link>
        );
      });
    }
  }
  return (
    <div className="movies">
      <div className={props.movies_count === undefined ? 'movies__title' : 'movies__search__title'}>
        {props.title}
      </div>
      <div className="movies__list">
        {showMovies()}
      </div>
    </div>
  )
}

export default MovieGrid
