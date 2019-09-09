import React, { Component } from "react";

export class Autocomplete extends Component {
  state = {
    data: this.props.options
  };

  componentDidMount() {
    console.log(this.props.options);
    var elem = document.querySelector(".autocomplete");
    var instance = window.M.Autocomplete.init(elem, {
      data: this.props.options,
      minLength: 0,
      limit: 5,
      onAutocomplete: this.onSelect
    });
  }

  onSelect = (val, dsf) => {
    debugger;
  };

  render() {
    return (
      <div className="input-field col s12">
        {/* <i class="material-icons prefix">textsms</i> */}
        <input type="text" id="autocomplete-input" className="autocomplete" />
        <label htmlFor="autocomplete-input">Autocomplete</label>
      </div>
    );
  }
}

Autocomplete.defaultProps = {
  onSelect: value => console.log(value),
  options: { apple: { id: 1, name: "apple" } }
};

export default Autocomplete;
