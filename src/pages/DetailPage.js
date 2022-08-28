import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function DetailPage() {
  const params = useParams();
  const movies = useSelector((state) => state.movies.movies);
  const movie = movies.find((movie) => movie.id === params.movieId);
  return (
    <>
      {!movie && (
        <div className="page-content">
          <h1>Not found movie.</h1>
        </div>
      )}
      {!!movie && (
        <>
          <div className="page-content">
            <h1>{movie.name}</h1>
            <p>Category: {movie.category}</p>
            <p>Description: {movie.description}</p>
          </div>
          <div className="centered">
            <iframe
              width="80%"
              height="580px"
              src={movie.link}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </>
      )}
    </>
  );
}

export default DetailPage;
