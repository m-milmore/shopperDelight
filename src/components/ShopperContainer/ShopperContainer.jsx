import React from "react";
import ProductCard from "./ProductCard";

const ShopperContainer = ({
  appState: { data, loading, error, itemsToCart },
  handleAddItemsToCart,
  handleChangeQuantity,
}) => {
  return (
    <div className="container px-0">
      <h1 className="mb-5">Shopper's Delight</h1>
      <div className="row justify-content-center">
        {!loading ? (
          data.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              handleAddItemsToCart={handleAddItemsToCart}
              itemsToCart={itemsToCart}
              handleChangeQuantity={handleChangeQuantity}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      {error && (
        <h3 className="text-danger">
          "Error loading data...
          <span role="img" aria-label="smiley">
            😐
          </span>
          "
        </h3>
      )}
    </div>
  );
};

export default ShopperContainer;
