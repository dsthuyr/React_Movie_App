import React from "react";
import MoviesList from "../components/Movies/MoviesList";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function CategoryMoviePage() {
  const movies = useSelector((state) => state.movies.movies);
  const params = useParams();
  const categotyName = params.categoryName;

  const movieByCategory = movies.filter((movie) => {
    return movie.category === categotyName;
  });
  return (
    <>
      <div className="page-content">
        <h1>{categotyName}</h1>
        <MoviesList movies={movieByCategory} />
      </div>
    </>
  );
}

export default CategoryMoviePage;
