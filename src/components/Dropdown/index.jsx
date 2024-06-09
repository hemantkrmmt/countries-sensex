import React, { useState } from "react";
import "./style.css";

function Dropdown({placeholderText="Select", selectedValue, setValue, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = Object.entries(options).find(([key, value]) => {
    return value === selectedValue;
  });
  const optionLabel = selectedOption ? selectedOption[0] : placeholderText;
  return (
    <div className="dropdown-wrapper">
      <div
        className="select-container"
        onClick={() => {setIsOpen(!isOpen)}}
      >
        {optionLabel || placeholderText} <img src="/select.svg" width={10} />
      </div>

      {isOpen && <ul
        className="modal"
        onClick={(e) => {
          setValue(e.target.value);
          setIsOpen(!isOpen)
        }}
      >
        {Object.entries(options).map(([key, value]) => {
          return (
            <li
              className={value === selectedValue ? "selected" : ""}
              value={value}
            >
              {key}
            </li>
          );
        })}
      </ul>}
    </div>
  );
}

export default Dropdown;
