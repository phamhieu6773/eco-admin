import React from "react";

const CustomInput = (props) => {
  const {
    type,
    label,
    i_id,
    i_class,
    name,
    val,
    onCh,
    onBl,
    onKeyPress,
    onKeyDown,
  } = props;
  return (
    <div className="form-floating w-100 mt-3">
      <input
        type={type}
        // autocomplete="off"
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onBl}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
