import React from "react";
import "./RadioButtons.css";

class RadioButtons extends React.Component {
  render(props) {
    const { accessType, handleRadioChange } = this.props;

    return (
      <div className="radio-buttons-container" onChange={handleRadioChange}>
        <input
          type="radio"
          id="signIn"
          name="accessType"
          value="signIn"
          checked={accessType === "signIn"}
          onChange={handleRadioChange}
        />
        <label
          className="radio-button-label"
          htmlFor="signIn"
          style={
            accessType === "signIn"
              ? { color: "rgb(204, 44, 83)" }
              : { color: "black" }
          }
        >
          SIGN IN
        </label>
        <input
          type="radio"
          id="signUp"
          name="accessType"
          value="signUp"
          checked={accessType === "signUp"}
          onChange={handleRadioChange}
        />
        <label
          className="radio-button-label"
          htmlFor="signUp"
          style={
            accessType === "signIn"
              ? { color: "black" }
              : { color: "rgb(204, 44, 83)" }
          }
        >
          CREATE ACCOUNT
        </label>
      </div>
    );
  }
}

export default RadioButtons;
