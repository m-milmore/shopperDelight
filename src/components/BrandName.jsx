import React from "react";

const BrandName = () => {
  return (
    <a
      href="#!"
      className="navbar-brand me-auto text-start align-items-start position-relative"
    >
      <span className="fw-bold text-info h3">
        <i className="bi bi-shop-window display-6"></i>
      </span>
      <span className="fst-normal text-info position-absolute top-25 pb-2 mt-2 ms-2 text-decoration-underline h4">
        Shopper's Delight
      </span>
    </a>
  );
};

export default BrandName;
