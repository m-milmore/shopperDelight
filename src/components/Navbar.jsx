import React from "react";
import LoginSignupScreen from "./LoginSignupScreen/LoginSignupScreen";

const Navbar = ({ itemsToCart }) => {
  const handleUsername = (username) => {
    console.log(username);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="d-flex container-xxl">
        {/* Brand name */}
        <a href="#!" className="navbar-brand flex-grow-1 text-start">
          <span className="fw-bold text-secondary">
            <i className="bi bi-shop-window fs-2"></i> Shopper's Delight
          </span>
        </a>

        <LoginSignupScreen handleUsername={handleUsername} />

        {/* Cart icon */}
        <a className="navbar-brand position-relative" href="#!">
          <span
            className={`navbar-brand position-absolute ${
              itemsToCart.length < 99 ? "text-warning" : "text-danger"
            } top-50 start-50 translate-middle fw-bold`}
          >
            {itemsToCart.length}
          </span>
          <i className="bi bi-cart display-3"></i>
          {itemsToCart.length === 99 && (
            <h6 className="position-absolute text-danger top-75 start-50 translate-middle">
              cart full
            </h6>
          )}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
