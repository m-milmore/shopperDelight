import React from "react";
import "./EditableInput.css";

const EditableInput = ({ type, name, onChange, value, check, xmark }) => {
  return (
    <div className="edit-input-container">
      <input
        type={type}
        className="form-control2"
        name={name}
        onChange={onChange}
        value={value}
      />
      <div className="check-close-container">
        <i onClick={check} className="fa-solid fa-circle-check"></i>
        <i onClick={xmark} className="fa-solid fa-circle-xmark"></i>
      </div>
    </div>
  );
};

export default EditableInput;
