import React from "react";
import Items from "./Items";
import Summary from "./Summary";

const CheckoutPage = ({
  data,
  itemsToCart,
  taxes,
  handleRemoveItem,
  handleChangeQuantity,
  handleInventoryQuantities,
}) => {
  return (
    <div className="container px-0 mb-5 mx-1">
      <h1 className="mb-3">- checkout page -</h1>
      <div className="row mx-0 px-0 d-flex justify-content-center">
        <Items
          data={data}
          itemsToCart={itemsToCart}
          handleRemoveItem={handleRemoveItem}
          handleChangeQuantity={handleChangeQuantity}
        />
        <Summary
          data={data}
          itemsToCart={itemsToCart}
          taxes={taxes}
          handleInventoryQuantities={handleInventoryQuantities}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
