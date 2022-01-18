import { useContext } from "react";
import classNames from "classnames";
import Button from "../common/Button";
import AuthContext from "../auth/context";
import { ReactComponent as Icon } from "../../assets/logo.svg";

import { Link, NavLink } from "react-router-dom";

import "./Header.css";

function Header({ className }) {
  const { isLogged, handleLogout } = useContext(AuthContext);
  return (
    <header className={classNames("header", className)}>
      <Link to="/">
        <div className="header-logo">
          <Icon width="32" height="32" />
        </div>
      </Link>
      <nav className="header-nav">
        <Link to="/ad/new">New Ad</Link>
        {isLogged ? (
          <Button className="header-button" onClick={handleLogout}>
            Log out
          </Button>
        ) : (
          <Button
            variant="primary"
            className="header-button"
            as={Link}
            to="/login"
          >
            Log in
          </Button>
        )}
      </nav>
    </header>
  );
}

export default Header;
