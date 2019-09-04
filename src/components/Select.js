import React from "react";

class Select extends React.Component {
  state = {
    instance: null,
    selectedValue: this.props.selectedValue
  };

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.options !== this.props.options) {
      this.init();
    }
  }

  init = () => {
    let elem = document.querySelector(`select#${this.props.name}`);
    let instance = window.M.FormSelect.init(elem);
    this.setState(() => ({ instance }));
  };

  onSelectChange = event => {
    const value = event.target.value;
    this.setState({ selectedValue: value });
    this.props.onChange(value);
  };

  renderOptions() {
    return this.props.options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ));
  }

  render() {
    return (
      <div className="input-field col s12">
        <select
          id={this.props.name}
          defaultValue={this.state.selectedValue}
          onChange={this.onSelectChange}
        >
          {this.renderOptions()}
        </select>
        <label htmlFor={this.props.name}>{this.props.label}</label>
      </div>
    );
  }
}

export default Select;

Select.defaultProps = {
  label: "Выберите вариант"
};
