import { createSlice } from "@reduxjs/toolkit";

const initialMoviesState = {
  movies: [],
  numberOfMovies: 0,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: initialMoviesState,
  reducers: {
    setAllMovies(state, action) {
      state.movies = action.payload.movies;
      state.numberOfMovies = action.payload.movies.length;
    },
  },
});
export const movieActions = moviesSlice.actions;

export default moviesSlice.reducer;
