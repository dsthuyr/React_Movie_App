import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <>
      <MainNavigation />
      <div className={classes.background} />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
