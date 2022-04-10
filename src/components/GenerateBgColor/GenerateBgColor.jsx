import React from "react";
import "./GenerateBgColor.css";

const GenerateBgColor = ({ generateBgColor }) => {
  return (
    <div role="presentation" onClick={generateBgColor} className="avatar-text">
      Generate background color
    </div>
  );
};

export default GenerateBgColor;
