import React from "react";

function Field(props) {
  return (
    <>
      <input id={props.name} type="text" className="validate" />
      <label htmlFor={props.name}>{props.label}</label>
    </>
  );
}

export default Field;
