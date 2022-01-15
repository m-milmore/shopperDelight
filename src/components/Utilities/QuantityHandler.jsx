import React from "react";
import "./QuantityHandler.css";

const QuantityHandler = ({ id, quantity, handleChangeQuantity, inStock }) => {
  return (
    <div className="quantity-wrapper">
      <div className="h5-container">
        <h5>{quantity}</h5>
      </div>
      <div className="chevron-container">
        <button className="quantity-handler-btn">
          <i
            className={`fas fa-chevron-up ${(quantity === 10 ||
              quantity === inStock) &&
              "inactive"}`}
            onClick={() => handleChangeQuantity(id, 1)}
          ></i>
        </button>
        <button className="quantity-handler-btn">
          <i
            className={`fas fa-chevron-down ${quantity === 0 && "inactive"}`}
            onClick={() => handleChangeQuantity(id, -1)}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default QuantityHandler;
