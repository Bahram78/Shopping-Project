import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Styles from "../Header/Header.module.css";
import { Contexts } from "../../App";

const Header = () => {
  const Locations = useLocation();

  return (
    <div>
      <div className={Styles.HeaderName}>
        <h1>AhamadReza Project</h1>
      </div>
      <div className={Styles.btncontainer}>
        <Link to="/" className={Styles.btns}>
          <button
            className={`${Styles.btn} ${
              Locations.pathname === "/" && Styles.active
            }`}
          >
            HomePage
          </button>
        </Link>

        <Link to="/Favorites">
          <button
            className={`${Styles.btn} ${
              Locations.pathname === "/Favorites" && Styles.active
            }`}
          >
            Favorites
          </button>
        </Link>
        <Link to="/ShoppingCard">
          <button
            className={`${Styles.btn} ${
              Locations.pathname === "/ShoppingCard" && Styles.active
            }`}
          >
            Shopping Card
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Header;
