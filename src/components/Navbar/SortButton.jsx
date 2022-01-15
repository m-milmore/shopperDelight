import React from "react";

const SortButton = ({ handleSortByCategories }) => {
  return (
    <span
      className="tt btn btn-outline-info btn-md"
      role="button"
      data-bs-placement="bottom"
      title="Sort products by category"
      onClick={handleSortByCategories}
    >
      <i
        className="fas fa-sort-alpha-down h3 m-0 p-0"
        style={{ transform: "translate(-10%, 13%)" }}
      ></i>
    </span>
  );
};

export default SortButton;
