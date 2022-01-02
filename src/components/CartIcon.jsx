import React from "react";
import { Link } from "react-router-dom";

const CartIcon = ({ itemsToCart }) => {
  return (
    <Link
      className="navbar-brand position-relative"
      to={itemsToCart.length === 0 ? "" : "/checkout"}
    >
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
    </Link>
  );
};

export default CartIcon;
