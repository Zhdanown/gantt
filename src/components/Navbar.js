import React from "react";
import logo from "../AT_logo.png";

function Navbar() {
  return (
    <nav className="green lighten-2">
      <div className="nav-wrapper container">
        <a href="#" className="brand-logo">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          Logo
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="#">Техника</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
