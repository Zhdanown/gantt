import React from "react";

class Select extends React.Component {
  state = {
    id: this.props.name + Math.round(Math.random() * 10000),
    instance: null,
    selectedValue:
      typeof this.props.selectedValue === "string"
        ? this.props.selectedValue
        : JSON.stringify(this.props.selectedValue)
  };

  componentDidMount() {
    this.init();
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.init();
    }
  }

  init = () => {
    let elem = document.querySelector(`select#${this.state.id}`);
    let instance = window.M.FormSelect.init(elem);
    this.setState(() => ({ instance }));
  };

  onSelectChange = event => {
    let value = event.target.value;
    try {
      value = JSON.parse(value);
    } catch (e) {}

    this.setState({ selectedValue: value });
    this.props.onChange(value);
  };

  renderOptions() {
    const { options } = this.props;

    // if options are strings
    if (typeof options[0] !== "object") {
      return options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ));
    }
    // if options are objects
    else {
      const _options = [{ name: "Не выбрано", id: null }, ...options];
      return (
        <>
          {_options.map((option, index) => (
            <option key={index} value={JSON.stringify(option)}>
              {this.props.labelKey(option)}
            </option>
          ))}
          ;
        </>
      );
    }
  }

  render() {
    return (
      <div className="input-field col s12">
        <select
          id={this.state.id}
          defaultValue={this.state.selectedValue}
          onChange={this.onSelectChange}
          disabled={this.props.disabled}
        >
          {this.renderOptions()}
        </select>
        <label htmlFor={this.state.id}>{this.props.label}</label>
      </div>
    );
  }
}

export default Select;

Select.defaultProps = {
  label: "Выберите вариант",
  options: [],
  selectedValue: null,
  disabled: false,
  onChange: option => console.log(option),
  labelKey: option => option.name
};
