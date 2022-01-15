import React from "react";
import { formatter } from "../../constants";

const Summary = ({ data, itemsToCart, taxes, handleInventoryQuantities }) => {
  const price = (id) =>
    data.find((product) => product.id === id).price.replace(/[^0-9.]+/g, "");

  const calcSubTotal = () => {
    let sum = itemsToCart.reduce(
      (cumul, current) =>
        parseFloat(current.quantity) * parseFloat(price(current.id)) + cumul,
      0
    );
    return sum;
  };

  const subTotal = itemsToCart.length === 0 ? 0 : calcSubTotal();
  const gst = (parseFloat(subTotal) * taxes.gst) / 100;
  const pst = (parseFloat(subTotal) * taxes.pst) / 100;
  const total = parseFloat(subTotal) + gst + pst;

  return (
    <div className="col-lg-2 mx-2 px-0 pb-4 pt-3 shadow bg-light d-flex flex-column">
      <h5 className="h5">Summary</h5>
      <div className="my-4 mx-3">
        <hr className="text-secondary" />
      </div>
      <div className="container">
        <div className="row mb-1">
          <div className="col-3 d-lg-none"></div>
          <div className="col-3 col-lg-12 col-xl-6 px-0 text-xl-start">
            Subtotal:
          </div>
          <div className="col-3 col-lg-12 col-xl-6 fw-bold px-0 text-xl-end">
            {formatter.format(subTotal)}
          </div>
        </div>
        <div className="row">
          <div className="col-3 d-lg-none"></div>
          <div className="col-3 col-lg-12 col-xl-6 px-0 text-xl-start">
            GST:
          </div>
          <div className="col-3 col-lg-12 col-xl-6 fw-bold px-0 text-xl-end">
            {formatter.format(gst)}
          </div>
        </div>
        <div className="row">
          <div className="col-3 d-lg-none"></div>
          <div className="col-3 col-lg-12 col-xl-6 px-0 text-xl-start">
            PST:
          </div>
          <div className="col-3 col-lg-12 col-xl-6 fw-bold px-0 text-xl-end">
            {formatter.format(pst)}
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-3 d-lg-none"></div>
          <div className="col-3 col-lg-12 col-xl-6 px-0 text-xl-start">
            Total:
          </div>
          <div className="col-3 col-lg-12 col-xl-6 fw-bold text-danger px-0 text-xl-end">
            {formatter.format(total)}
          </div>
        </div>
      </div>
      <div className="my-4 mx-3">
        <hr className="text-secondary" />
      </div>
      <div className="container px-2 mt-auto">
        <button
          type="button"
          className="btn btn-danger btn-lg"
          style={{ width: "100%" }}
          onClick={handleInventoryQuantities}
        >
          {`Pay ${formatter.format(total)}`}
        </button>
      </div>
    </div>
  );
};

export default Summary;
