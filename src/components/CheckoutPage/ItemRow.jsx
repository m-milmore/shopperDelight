import React from "react";
import { formatter } from "../../constants";
import ItemProduct from "./ItemProduct";
import QuantityHandler from "../Utilities/QuantityHandler";

const ItemRow = ({ item, data, handleRemoveItem, handleChangeQuantity }) => {
  const card = data.filter((ele) => ele.id === item.id)[0];
  const convPrice = card.price.replace(/[^0-9.]+/g, "");

  return (
    <div className="container mx-0 px-0">
      <div className="my-4 mx-3">
        <hr className="text-secondary" />
      </div>
      <div className="row mx-1 px-0 pb-0 align-items-center d-flex">
        <div className="col-5 d-flex align-items-center m-0 p-0">
          <div className="row align-items-center">
            <div className="col-2">
              <span role="button" onClick={() => handleRemoveItem(item.id)}>
                <i className="fas fa-times-circle"></i>
              </span>
            </div>
            <div className="col-10 text-start">
              <ItemProduct
                card={card}
                handleChangeQuantity={handleChangeQuantity}
              />
            </div>
          </div>
        </div>
        <div className="col-7 align-items-center m-0 p-0">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-sm-4 d-flex flex-column align-items-center justify-content-center">
              <div className="px-1 d-flex align-items-center justify-content-center text-danger fw-bold">
                <p className="d-sm-none m-0 p-0">Price:&nbsp;</p>
                {card.price}
              </div>
              <p className="m-0 p-0 fs-6">in stock: {card.quantity}</p>
            </div>
            <div className="col-sm-4">
              <QuantityHandler
                id={item.id}
                quantity={item.quantity}
                handleChangeQuantity={handleChangeQuantity}
                inStock={card.quantity}
              />
            </div>
            <div className="col-sm-4 px-1 d-flex align-items-center justify-content-center">
              <p className="d-sm-none m-0 p-1">Total:</p>
              {formatter.format(convPrice * item.quantity)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemRow;
