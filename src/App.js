import Layout from "./components/Layout/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import React, { Suspense, useEffect } from "react";
import axios from "axios";
import { movieActions } from "./store/movies";
import LoadingSpinner from "./components/UI/LoadingSpinner";
// import CategoryMoviePage from "./pages/CategoryMoviePage";
// import DetailPage from "./pages/DetailPage";
// import PageNotFound from "./pages/PageNotFound";
// import NotifyPage from "./pages/NotifyPage";
// import AuthPage from "./pages/AuthPage";
// import HomePage from "./pages/HomePage";
// import ProfilePage from "./pages/ProfilePage";

const CategoryMoviePage = React.lazy(() => import("./pages/CategoryMoviePage"));
const DetailPage = React.lazy(() => import("./pages/DetailPage"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));
const NotifyPage = React.lazy(() => import("./pages/NotifyPage"));
const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));

const theme = createTheme({
  // palette: {
  //   custom1: {
  //     main: "#333",
  //   },
  //   custom2: {
  //     main: "#CE0000",
  //   },
  // },
});

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        "https://react-movieapp-74412-default-rtdb.firebaseio.com/movies.json"
      )
      .then((response) => {
        dispatch(movieActions.setAllMovies({ movies: response.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/category/:categoryName"
              element={<CategoryMoviePage />}
            />
            <Route path="/auth" element={<AuthPage />} />
            {isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
            {isLoggedIn && (
              <Route path="/detailMovie/:movieId" element={<DetailPage />} />
            )}
            {!isLoggedIn && (
              <Route
                path="/detailMovie/:movieId"
                element={
                  <NotifyPage text="Please login to use this feature!" />
                }
              />
            )}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
