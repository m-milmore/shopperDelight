import React from "react";

const SortButton = ({ handleSortByCategories }) => {
  return (
    <span
      className="tt btn btn-outline-info btn-lg p-1 me-3 d-none d-md-inline"
      role="button"
      data-bs-placement="bottom"
      title="Sort products by category"
			onClick={handleSortByCategories}
    >
      <i className="far fa-sort-alpha-down"></i>
    </span>
  );
};

export default SortButton;
