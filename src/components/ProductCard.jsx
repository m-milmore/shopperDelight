import React from "react";

const ProductCard = ({ product, handleAddItemsToCart, itemsToCart }) => {
  const { title, price, image, id } = product;
  // const cleanDesc = desc.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2">
      <div className="card border-0 mb-5">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body my-2 px-0">
          <h5
            className="card-title mb-0 bg-light"
            style={{ minHeight: "50px" }}
          >
            {title}
          </h5>
          <p className="card-text mb-2">{price}</p>
          <button
            type="button"
            disabled={itemsToCart.length === 99}
            className="btn btn-sm text-white rounded-pill btn-info px-5 px-lg-4 px-xl-5 text-nowrap"
            onClick={handleAddItemsToCart(id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
