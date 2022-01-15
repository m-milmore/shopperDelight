import React from "react";
import "./SearchButton.css";
import DetailPage from "../Utilities/DetailPage";
import { Modal } from "bootstrap";

const SearchButton = ({ data, itemsToCart, handleChangeQuantity }) => {
  const products = data.map((product) => ({
    title: product.title,
    id: product.id,
  }));
  const [suggestions, setSuggestions] = React.useState([]);
  const [inputSearch, setInputSearch] = React.useState("");

  const handleInputChange = ({ target: { value } }) => {
    let matches = [];
    if (value.length > 0) {
      matches = products.filter((product) => {
        const re = new RegExp(`${value}`, "gi");
        return product.title.match(re);
      });
    }
    setSuggestions(matches);
    setInputSearch(value);
  };

  const suggestHandler = (suggestion) => {
    const searchModal = new Modal(document.getElementById(suggestion.id), {});
    setInputSearch(suggestion.title);
    setSuggestions([]);
    searchModal.show();
  };

  const handleSearchButton = () => {
    if (inputSearch.length > 0) {
      const found = products.find((product) => product.title === inputSearch);
      if (found !== undefined) suggestHandler(found);
      else alert("no product under that name.");
    }
  };

  return (
    <div className="d-flex align-items-baseline">
      <div className="d-flex flex-column position-relative">
        <div className="input-group">
          <input
            className="form-control search-style my-0"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleInputChange}
            value={inputSearch}
          />
          <span
            className="input-group-text btn btn-secondary"
            role="button"
            onClick={handleSearchButton}
          >
            <i className="fas fa-search"></i>
          </span>
        </div>
        {suggestions.length > 0 && (
          <div
            className="list-group list-group-flush border rounded corners"
            style={{
              position: "absolute",
              zIndex: "1000",
              width: "100%",
              top: "2.39rem",
            }}
          >
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                className="list-group-item list-group-item-action list-group-item-light h6 my-0 py-1 border-0 text-start"
                onClick={() => suggestHandler(suggestion)}
              >
                {suggestion.title}
              </button>
            ))}
          </div>
        )}
      </div>
      {data.map((product) => (
        <DetailPage
          key={product.id}
          product={product}
          itemsToCart={itemsToCart}
          handleChangeQuantity={handleChangeQuantity}
        />
      ))}
    </div>
  );
};

export default SearchButton;
