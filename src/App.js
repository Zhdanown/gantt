import React from "react";
import Navbar from "./components/Navbar";
import Diagramm from "./components/Diagramm";
import "./styles/sass/season-plan.scss";

function App() {
  return (
    <div className="season-plan">
      <Navbar />

      <Diagramm />
    </div>
  );
}

export default App;
