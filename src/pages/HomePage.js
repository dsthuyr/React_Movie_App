import React from "react";
import MoviesList from "../components/Movies/MoviesList";
import Slider from "../components/Slider/Slider";
import { useSelector } from "react-redux";

function HomePage() {
  const movies = useSelector((state) => state.movies.movies);
  const trending = movies.slice(4, 8);
  const newMovies = movies.slice(0, 4);
  const animeAndCartoon = movies.filter(
    (movie) => movie.category === "Anime" || movie.category === "Cartoon"
  );
  return (
    <>
      <Slider />
      <div className="page-content">
        <h1>New Movies</h1>
        <MoviesList movies={newMovies} />
      </div>
      <div className="page-content">
        <h1>Top trending</h1>
        <MoviesList movies={trending} />
      </div>
      <div className="page-content">
        <h1>Anime & Cartoon</h1>
        <MoviesList movies={animeAndCartoon} />
      </div>
    </>
  );
}

export default HomePage;
