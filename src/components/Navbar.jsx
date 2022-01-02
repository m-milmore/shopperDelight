import React from "react";
import BrandName from "./BrandName";
import SearchButton from "./SearchButton";
import SortButton from "./SortButton";
import LoginSignupScreen from "./LoginSignupScreen/LoginSignupScreen";
import CartIcon from "./CartIcon";

const Navbar = ({ itemsToCart, handleSortByCategories, data }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="d-flex container-xxl">
        <BrandName />
        <div className="navbar justify-content-end align-center flex-nowrap">
          <SearchButton data={data} />
          <SortButton handleSortByCategories={handleSortByCategories} />
          <LoginSignupScreen />
          <CartIcon itemsToCart={itemsToCart} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
