import React from "react";
import MovieItem from "./MovieItem";
import classes from "./MoviesList.module.css";
// import { useSelector } from "react-redux";
import LoadingSpinner from "../UI/LoadingSpinner";

function MoviesList(props) {
  // const movies = useSelector((state) => state.movies.movies);
  // const numberOfMovies = useSelector((state) => state.movies.numberOfMovies);
  const { movies } = props;
  const numberOfMovies = movies.length;
  return (
    <>
      {!numberOfMovies && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {numberOfMovies && (
        <ul className={classes.cards}>
          {movies.map((movie) => {
            return (
              <MovieItem
                key={movie.id}
                id={movie.id}
                name={movie.name}
                description={movie.description}
                category={movie.category}
                img={movie.img}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}

export default MoviesList;
