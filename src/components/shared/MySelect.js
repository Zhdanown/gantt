import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../../styles/sass/react-select.scss";

function MySelect({ options, defaultValue, ...props }) {
  options = options.map(option => {
    return {
      label: option.name || option.label,
      value: option
    };
  });

  const [selectedValue, setValue] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue === null) setValue(defaultValue);
  }, [defaultValue]);

  const onSelectChange = value => {
    setValue(value);
    if (value) props.onChange(value.value);
    else props.onChange(value);
  };

  return (
    <Select
      className="react-select"
      value={selectedValue}
      onChange={onSelectChange}
      options={options}
      isClearable={true}
      isSearchable={true}
    />
  );
}

MySelect.defaultProps = {
  onChange: option => console.log(option)
};

export default MySelect;
