import React from "react";
import { Link } from "react-router-dom";

const CartIcon = ({ itemsToCart }) => {
  return (
    <Link to="/checkout">
      <span
        className={`position-absolute ${
          itemsToCart.length < 99 ? "text-warning" : "text-danger"
        } top-50 start-50 translate-middle fw-bold h4`}
      >
        {itemsToCart.length}
      </span>
      <i className="bi bi-cart display-1"></i>
      {itemsToCart.length === 99 && (
        <h6 className="position-absolute text-danger top-75 start-50 translate-middle">
          cart full
        </h6>
      )}
    </Link>
  );
};

export default CartIcon;
