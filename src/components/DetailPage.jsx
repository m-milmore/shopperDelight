import React from "react";
import "./DetailPage.css";

const DetailPage = ({ product, itemsToCart, handleChangeQuantity }) => {
  const { title, price, image, desc, id } = product;
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
                <div className="col-md-4">
                  <img
                    src={image}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{cleanDesc}</p>
                    <div className="quantity-container px-3">
                      <h5 className="card-text">
                        <small className="text-danger">{`Price: ${price}`}</small>
                      </h5>
                      <div className="quantity-wrapper">
                        <div className="h5-container">
                          <h5>{quantity}</h5>
                        </div>
                        <div className="chevron-container">
                          <i
                            className={`fas fa-chevron-up ${
                              quantity === 10 && "inactive"
                            }`}
                            onClick={() => handleChangeQuantity(id, 1)}
                          ></i>
                          <i
                            className={`fas fa-chevron-down ${
                              quantity === 0 && "inactive"
                            }`}
                            onClick={() => handleChangeQuantity(id, -1)}
                          ></i>
                        </div>
                      </div>
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
