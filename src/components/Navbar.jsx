import React from "react";
import BrandName from "./BrandName";
import SortButton from "./SortButton";
import LoginSignupScreen from "./LoginSignupScreen/LoginSignupScreen";
import CartIcon from "./CartIcon";

const Navbar = ({ itemsToCart, handleSortByCategories }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="d-flex container-xxl">
        <BrandName />
        <SortButton handleSortByCategories={handleSortByCategories} />
        <LoginSignupScreen />
        <CartIcon itemsToCart={itemsToCart} />
      </div>
    </nav>
  );
};

export default Navbar;
