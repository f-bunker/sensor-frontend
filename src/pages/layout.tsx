import { Outlet, Link } from "react-router-dom";
import classes from "./layout.module.css"

const Layout = () => {
  return (
    <>
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
        </ul>
      </nav>
    </header>
    <Outlet />
    </>
  )
};

export default Layout;