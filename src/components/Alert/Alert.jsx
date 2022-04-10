import React from "react";
import PropTypes from "prop-types";
import "./Alert.css";

const Alert = ({ message, type, close }) => {
  return (
    <div onClick={close} className={`alert ${type}`} role="alert">
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  close: PropTypes.func,
};

Alert.defaultProps = {
  message: "Alert Message",
  type: "success",
  close: () => {},
};

export default Alert;
