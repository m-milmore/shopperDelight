import React from "react";
import "./DetailPage.css";
import QuantityHandler from "../Utilities/QuantityHandler";

const DetailPage = ({ product, itemsToCart, handleChangeQuantity }) => {
  const { title, price, image, desc, id, quantity: inStock } = product;
  const cleanDesc = desc.replace(/<\/?[^>]+(>|$)/g, "");
  const result = itemsToCart.filter((item) => item.id === id);
  const quantity = result.length === 0 ? 0 : result[0].quantity;

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby="modal-title"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content text-dark bg-light">
          <div className="modal-header">
            <h5 className="modal-title">Product Detail</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4 p-1">
                  <img
                    src={image}
                    className="img-fluid rounded-start"
                    alt="product"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text para-left">{cleanDesc}</p>
                    <div className="quantity-container px-3">
                      <div>
                        <h5 className="card-text m-0 p-0">
                          <small className="text-danger">{`Price: ${price}`}</small>
                        </h5>
                        <h6 className="h6 m-0 p-0">qty in stock: {inStock}</h6>
                      </div>
                      <QuantityHandler
                        id={id}
                        quantity={quantity}
                        handleChangeQuantity={handleChangeQuantity}
                        inStock={inStock}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
