import React from "react";

const ProductCard = ({
  product,
  handleAddItemsToCart,
  itemsToCart,
  handleChangeQuantity,
}) => {
  const { title, price, image, id, quantity } = product;

  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2">
      <div className="card border-0 mb-5">
        <div
          className="card-body my-2 px-0"
          role="button"
          data-bs-toggle="modal"
          data-bs-target={`#${id}`}
        >
          <img src={image} className="card-img-top" alt={title} />
          <h5
            className="card-title m-0 p-0 bg-light d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "3rem" }}
          >
            {title}
          </h5>
          <p className="card-text m-0 p-0 mt-2">{price}</p>
          <h6 className="h6 m-0 p-0">qty in stock: {quantity}</h6>
        </div>
        <button
          type="button"
          disabled={
            itemsToCart.length === 99 ||
            itemsToCart.some((item) => item.id === id) ||
            quantity < 0
          }
          className="btn btn-sm text-white rounded-pill btn-info px-5 px-lg-4 px-xl-5 text-nowrap"
          onClick={() => handleAddItemsToCart(id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
