import React from "react";
import LoginSignupScreen from "./LoginSignupScreen/LoginSignupScreen";

const LoginModal = () => {
  const handleUsername = () => {
    console.log("HandleUsername");
  };
  
  return (
    <>
      {/* Navbar Login/Signup button */}
      <button
        className="btn btn-primary me-4"
        data-bs-toggle="modal"
        data-bs-target="#reg-modal"
      >
        Login/Signup
      </button>

      {/* modal itself */}
      <LoginSignupScreen handleUsername={handleUsername} />
    </>
  );
};

export default LoginModal;
