import React from "react";
import "./InputBase.css";
import LabelErrorContainer from "./LabelErrorContainer";

class InputBase extends React.Component {
  render() {
    const { label, error, typeIs, handleEyeIcon, eyeIcon, ...props } =
      this.props;

    return (
      <div className="input-base-container">
        <LabelErrorContainer label={label} error={error} />
        <input
          autoComplete="off"
          className={`${error ? "red-bg" : ""}`}
          {...props}
        />
        {typeIs === "password" && (
          <div className="eye-icon-container" onClick={handleEyeIcon}>
            <img src={eyeIcon} alt="eye" />
          </div>
        )}
      </div>
    );
  }
}

export default InputBase;
