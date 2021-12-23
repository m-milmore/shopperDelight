import React from "react";
import "./LoginSignupScreen.css";
import { PASSWORD_RULES, EYE_ICONS, accounts } from "../../constants";
import RadioButtons from "./RadioButtons";
import InputBase from "./InputBase";
import Facebook from "./Facebook";

const INIT_STATE = {
  accessType: "signIn",
  emailInput: "",
  emailLabel: "E-Mail",
  emailError: "",
  passwordInput: "",
  passwordLabel: "Password",
  passwordError: "",
  passwordType: "password",
  eyeIcon: EYE_ICONS["SHOW"],
  confirmPasswordInput: "",
  confirmPasswordError: "",
  confirmPasswordType: "password",
  confirmEyeIcon: EYE_ICONS["SHOW"],
  firstNameInput: "Jim",
  firstNameError: "",
  lastNameInput: "Jackson",
  lastNameError: "",
  postalCodeInput: "",
  postalCodeError: "",
  errorMessage: false,
  passwordMessage: false,
  submitButton: "SIGN IN",
  fbuser: "",
};

class LoginSignupScreen extends React.Component {
  constructor() {
    super();
    this.state = INIT_STATE;
  }

  handleCloseButton = () => {
    this.setState(INIT_STATE);
  };

  initSignIn = () => {
    this.setState({
      emailLabel: "E-Mail",
      emailError: "",
      passwordLabel: "Password",
      submitButton: "SIGN IN",
    });
    this.setState({
      errorMessage: this.state.passwordError ? this.state.errorMessage : "",
    });
  };

  initSignUp = () => {
    this.setState({
      emailLabel: "Your E-Mail Address *",
      passwordLabel: "Create Password *",
      submitButton: "SAVE",
    });
  };

  handleRadioChange = ({ target: { value } }) => {
    this.setState({ accessType: value });
    value === "signIn" ? this.initSignIn() : this.initSignUp();
  };

  handleStateChange = ({ target: { name, value } }) => {
    let re = /.*/;
    switch (name) {
      case "emailInput":
        break;
      case "passwordInput":
      case "confirmPasswordInput":
        re = /^[-A-Za-z0-9!@#$%^&*()_+]*$/;
        break;
      case "firstNameInput":
      case "lastNameInput":
        re = /^([\p{L}]+[,.]?[ ]?|[\p{L}]+['-]?)*$/u;
        break;
      case "postalCodeInput":
        re = /^[0-9]*$/;
        break;
      default:
        console.log(`${name} is not accounted for.`);
    }
    if (re.test(value)) {
      this.setState({ [name]: value });
    }
  };

  handleEyeIcon = (passNo1OrNo2 = "") => {
    const passObj =
      passNo1OrNo2 === "password"
        ? { pass: "passwordType", eye: "eyeIcon" }
        : { pass: "confirmPasswordType", eye: "confirmEyeIcon" };
    this.state[passObj.pass] === "text"
      ? this.setState({
          [passObj.pass]: "password",
          [passObj.eye]: EYE_ICONS["SHOW"],
        })
      : this.setState({
          [passObj.pass]: "text",
          [passObj.eye]: EYE_ICONS["HIDE"],
        });
  };

  isPasswordCompliant = () => {
    const array = this.state.passwordInput.split("");
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const specials = [
      "-",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "+",
    ];
    if (!array.some((ele) => ele === ele.toUpperCase())) {
      this.setState({
        passwordError: "Passwords must include at least 1 capital letter.",
      });
      return false;
    }
    if (!array.some((ele) => ele === ele.toLowerCase())) {
      this.setState({
        passwordError: "Passwords must include at least 1 small letter.",
      });
      return false;
    }
    if (array.filter((ele) => numbers.includes(ele)).length !== 1) {
      this.setState({ passwordError: "Passwords must include 1 number." });
      return false;
    }
    if (array.filter((ele) => specials.includes(ele)).length !== 1) {
      this.setState({
        passwordError: "Passwords must include 1 special character.",
      });
      return false;
    }
    return true;
  };

  gotoCartScreen = (username) => {
    const { handleUsername } = this.props;
    this.setState({
      errorMessage: false,
      passwordMessage: false,
      passwordType: "password",
      eyeIcon: EYE_ICONS["SHOW"],
      confirmPasswordType: "password",
      confirmEyeIcon: EYE_ICONS["SHOW"],
    });
    handleUsername(username, this.state.emailInput);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      firstNameError: "",
      lastNameError: "",
      postalCodeError: "",
    });
    setTimeout(() => {
      if (this.state.emailInput === "") {
        this.setState({
          emailError: "E-Mail Address missing...",
          errorMessage: true,
        });
      } else if (
        this.state.accessType === "signUp" &&
        accounts.some((account) => account === this.state.emailInput)
      ) {
        this.setState({
          emailError: "An account for that email already exist",
          errorMessage: true,
        });
      } else if (this.state.passwordInput === "") {
        this.setState({
          passwordError: "Password missing...",
          errorMessage: true,
        });
      } else if (!this.isPasswordCompliant()) {
        this.setState({ passwordMessage: true, errorMessage: true });
      } else if (
        this.state.accessType === "signUp" &&
        this.state.confirmPasswordInput === ""
      ) {
        this.setState({
          confirmPasswordError: "Confirmation Password missing...",
          errorMessage: true,
        });
      } else if (
        this.state.accessType === "signUp" &&
        this.state.passwordInput !== this.state.confirmPasswordInput
      ) {
        this.setState({
          confirmPasswordError: "Passwords mismatched...",
          errorMessage: true,
        });
      } else if (
        this.state.accessType === "signUp" &&
        this.state.firstNameInput === ""
      ) {
        this.setState({
          firstNameError: "First Name missing...",
          errorMessage: true,
        });
      } else if (
        this.state.accessType === "signUp" &&
        /\d/.test(this.state.firstNameInput)
      ) {
        this.setState({
          firstNameError: "Please enter a valid First Name",
          errorMessage: true,
        });
      } else if (
        this.state.accessType === "signUp" &&
        this.state.lastNameInput === ""
      ) {
        this.setState({
          lastNameError: "Last Name missing...",
          errorMessage: true,
        });
      } else if (
        this.state.accessType === "signUp" &&
        /\d/.test(this.state.lastNameInput)
      ) {
        this.setState({
          lastNameError: "Please enter a valid Last Name",
          errorMessage: true,
        });
      } else if (
        this.state.accessType === "signUp" &&
        this.state.postalCodeInput === ""
      ) {
        this.setState({
          postalCodeError: "Postal Code missing...",
          errorMessage: true,
        });
      } else {
        this.gotoCartScreen(
          `${this.state.firstNameInput} ${this.state.lastNameInput}`
        );
      }
    }, 50);
  };

  handleFbUsername = (username) => {
    this.setState({ fbUser: username });
    this.gotoCartScreen(this.state.fbUser);
  };

  render(props) {
    const {
      accessType,
      errorMessage,
      emailInput,
      emailLabel,
      emailError,
      passwordInput,
      passwordLabel,
      passwordError,
      passwordType,
      eyeIcon,
      passwordMessage,
      confirmPasswordInput,
      confirmPasswordError,
      confirmPasswordType,
      confirmEyeIcon,
      firstNameInput,
      firstNameError,
      lastNameInput,
      lastNameError,
      postalCodeInput,
      postalCodeError,
      submitButton,
    } = this.state;

    return (
      <div
        className={`login-signup-container modal fade`}
        id="reg-modal"
        tabIndex="-1"
        aria-labelledby="modal-title"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={this.handleCloseButton}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <button disabled style={{ display: "none" }}></button>
                <RadioButtons
                  accessType={accessType}
                  handleRadioChange={this.handleRadioChange}
                />
                <span className="error-message">
                  {errorMessage ? (
                    <>
                      We're sorry, but one or more fields are incomplete or
                      incorrect.
                      <br />
                      <u>Find Error(s)</u>.
                    </>
                  ) : (
                    ""
                  )}
                </span>
                <InputBase
                  label={emailLabel}
                  error={emailError}
                  type="email"
                  value={emailInput}
                  name="emailInput"
                  onChange={this.handleStateChange}
                  onFocus={() => {
                    this.setState({ emailError: "" });
                  }}
                  minLength="5"
                  maxLength="20"
                />
                <InputBase
                  label={passwordLabel}
                  error={passwordError}
                  type={passwordType}
                  value={passwordInput}
                  name="passwordInput"
                  onChange={this.handleStateChange}
                  onFocus={() => {
                    this.setState({ passwordError: "" });
                  }}
                  minLength="8"
                  maxLength="20"
                  typeIs="password"
                  eyeIcon={eyeIcon}
                  handleEyeIcon={() => this.handleEyeIcon("password")}
                />
                <span className="password-message">
                  {accessType === "signUp" || passwordMessage
                    ? PASSWORD_RULES
                    : ""}
                </span>
                {accessType === "signUp" && (
                  <>
                    <InputBase
                      label="Confirm Password *"
                      error={confirmPasswordError}
                      type={confirmPasswordType}
                      value={confirmPasswordInput}
                      name="confirmPasswordInput"
                      onChange={this.handleStateChange}
                      onFocus={() => {
                        this.setState({ confirmPasswordError: "" });
                      }}
                      minLength="8"
                      maxLength="20"
                      typeIs="password"
                      eyeIcon={confirmEyeIcon}
                      handleEyeIcon={this.handleEyeIcon}
                    />
                    <InputBase
                      label="First Name *"
                      error={firstNameError}
                      type="text"
                      value={firstNameInput}
                      name="firstNameInput"
                      onChange={this.handleStateChange}
                      onFocus={() => {
                        this.setState({ firstNameError: "" });
                      }}
                      minLength="2"
                      maxLength="20"
                    />
                    <InputBase
                      label="Surname *"
                      error={lastNameError}
                      type="text"
                      value={lastNameInput}
                      name="lastNameInput"
                      onChange={this.handleStateChange}
                      onFocus={() => {
                        this.setState({ lastNameError: "" });
                      }}
                      minLength="2"
                      maxLength="20"
                    />
                    <InputBase
                      label="Postcode"
                      error={postalCodeError}
                      type="number"
                      value={postalCodeInput}
                      name="postalCodeInput"
                      onChange={this.handleStateChange}
                      onFocus={() => {
                        this.setState({ postalCodeError: "" });
                      }}
                      min={10000}
                      max={99999}
                    />
                  </>
                )}
                <button className="submit-button">{submitButton}</button>
              </form>
              <div className="hr-container">
                <hr />
                <span>or</span>
                <hr />
              </div>
              <Facebook handleFbUsername={this.handleFbUsername} />
              <span className="span-cancel" onClick={this.handleCloseButton}>
                Cancel
              </span>
              <span className="span-policy">
                <u>Privacy Policy and Cookies</u>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <u>Terms of Sale and Use</u>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginSignupScreen;
