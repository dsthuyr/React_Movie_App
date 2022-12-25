import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import moviesReducer from "./movies";


const store = configureStore({
  reducer: { movies: moviesReducer, auth: authReducer },
});

export default store;
