import React from "react";
import { Link } from "react-router-dom";

const BrandName = () => {
  return (
    <Link to="/">
      <span className="fw-bold text-info h3">
        <i className="bi bi-shop-window display-6"></i>
      </span>
      <span className="text-info ms-2 text-decoration-underline h4">
        Shopper's Delight
      </span>
    </Link>
  );
};

export default BrandName;
