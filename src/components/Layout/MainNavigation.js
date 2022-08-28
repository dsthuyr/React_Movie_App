import classes from "./MainNavigation.module.css";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate, Link, NavLink } from "react-router-dom";

export default function MainNavigation() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const loginRedirectHandler = () => {
    navigate("/auth");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Movie1080</div>
      </Link>
      <nav className={classes.nav_category}>
        <ul>
          <li>
            <NavLink
              to="/category/TVSeries"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              <Button variant="text">TV series</Button>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/Movie"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              <Button variant="text">Movie</Button>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/Cartoon"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              <Button variant="text">Cartoon</Button>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/Anime"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              <Button variant="text">Anime</Button>
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          {isLoggedIn && (
            <>
              <li className={classes.nav_li_profile}>
                <NavLink
                  to="/profile"
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                >
                  <Button variant="text">Profile</Button>
                </NavLink>
              </li>
              <li>
                <Button onClick={logoutHandler} variant="contained">
                  Logout
                </Button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <li>
              <Button onClick={loginRedirectHandler} variant="contained">
                Login
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
