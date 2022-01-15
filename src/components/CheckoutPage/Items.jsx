import React from "react";
import ItemRow from "./ItemRow";

const Items = ({
  data,
  itemsToCart,
  handleRemoveItem,
  handleChangeQuantity,
}) => {
  return (
    <div className="col-lg-9 mx-2 px-0 pb-4 pt-3 shadow bg-light">
      <div className="container mx-0 px-0">
        {itemsToCart.length > 0 ? (
          <>
            <div className="row mx-0 px-0 h5 d-none d-sm-flex">
              <div className="col-1"></div>
              <div className="col-4">Product</div>
              <div className="col-2">Price</div>
              <div className="col-3">Quantity</div>
              <div className="col-2">Total</div>
            </div>
            {itemsToCart.map((item) => (
              <ItemRow
                item={item}
                key={item.id}
                data={data}
                handleRemoveItem={handleRemoveItem}
                handleChangeQuantity={handleChangeQuantity}
                itemsToCart={itemsToCart}
              />
            ))}
          </>
        ) : (
          <div>
            <div className="my-4 mx-3">
              <hr className="text-secondary" />
            </div>
            <div className="my-3">
              <span className="text-danger h5">No item in cart...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;
