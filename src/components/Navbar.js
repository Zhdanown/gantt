import React from "react";
import { connect } from "react-redux";
import logo from "../AT_logo.png";
import { fetchPlans } from "../actions/plans";

function Navbar(props) {
  return (
    <nav style={{ backgroundColor: "steelblue" }}>
      <div className="nav-wrapper container">
        <a href="#" className="brand-logo">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          Сезонный план
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="#" onClick={() => props.fetchPlans()}>
              Загрузить планы
            </a>
          </li>
          <li>
            <a href="#">Техника</a>
          </li>
        </ul>
        <ul className="right hide-on-large-only">
          <li>
            <a href="#">
              <i className="material-icons">more_vert</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default connect(
  null,
  { fetchPlans }
)(Navbar);
