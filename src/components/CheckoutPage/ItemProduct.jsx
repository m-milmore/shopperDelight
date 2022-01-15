import React from "react";
import truncate from "lodash.truncate";

const ItemProduct = ({ card, handleChangeQuantity }) => {
  const cleanDesc = truncate(card.desc.replace(/<\/?[^>]+(>|$)/g, ""));

  return (
    <div className="container">
      <div
        className="card mb-0 py-1 ps-1"
        role="button"
        data-bs-toggle="modal"
        data-bs-target={`#${card.id}`}
      >
        <div className="row g-0 d-flex align-items-center">
          <div className="col p-1">
            <img
              src={card.image}
              className="img-fluid rounded-start"
              alt="product"
            />
          </div>
          <div className="col-md-8 d-none d-md-block">
            <div className="card-body py-0 px-1">
              <h5 className="h6 card-title">{card.title}</h5>
              <p className="card-text">
                <small className="text-muted">{cleanDesc}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemProduct;
