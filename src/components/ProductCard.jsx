import React from "react";
import DetailPage from "./DetailPage";

const ProductCard = ({
  product,
  handleAddItemsToCart,
  itemsToCart,
  handleChangeQuantity,
}) => {
  const { title, price, image, id } = product;

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
            className="card-title my-2 bg-light"
            style={{ minHeight: "3rem" }}
          >
            {title}
          </h5>
          <p className="card-text mb-2">{price}</p>
        </div>
        <button
          type="button"
          disabled={
            itemsToCart.length === 99 ||
            itemsToCart.some((item) => item.id === id)
          }
          className="btn btn-sm text-white rounded-pill btn-info px-5 px-lg-4 px-xl-5 text-nowrap"
          onClick={() => handleAddItemsToCart(id)}
        >
          Add to Cart
        </button>
      </div>
      <DetailPage
        product={product}
        itemsToCart={itemsToCart}
        handleChangeQuantity={handleChangeQuantity}
      />
    </div>
  );
};

export default ProductCard;
