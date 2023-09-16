import React from "react";

const CustomInput = (props) => {
  const { type, label, i_id, i_class, name, val, onCh, onBl } = props;
  return (
    <div className="form-floating mt-3 mb-3">
      <input
        type={type}
        // autocomplete="off"
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onCh}
      />
      <label for={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
