import React from "react";
import NavbarStyle from "./style";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <NavbarStyle>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/game">Game</Link>
      </ul>
    </NavbarStyle>
  );
};

export default Navbar;
