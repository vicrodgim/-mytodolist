import React from "react";
import "./FormInput.css";

export const FormInput = ({
  id,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  inputClassName = "",
}) => {
  return (
    <div className="input-form">
      <input
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`default-input ${inputClassName}`}
      ></input>
    </div>
  );
};
