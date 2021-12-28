import React from "react";
import ShopperService from "../services";
import Navbar from "./Navbar";
import ProductCard from "../components/ProductCard";
import orderBy from "lodash.orderby";

const shopper = new ShopperService();
class ShopperContainer extends React.Component {
  state = {
    data: [],
    loading: false,
    error: false,
    itemsToCart: [],
  };

  componentDidMount() {
    this.setState({ loading: true });
    shopper.fetchShopperProducts().then(
      (res) => {
        if (res && res.response.ok) {
          this.setState({ data: res.data });
        }
        this.setState({ loading: false });
      },
      (error) => {
        this.setState({ loading: false, error: true });
      }
    );
  }

  handleAddItemsToCart = (id) => {
    this.state.itemsToCart.length < 99 &&
      this.setState({
        itemsToCart: [...this.state.itemsToCart, { id, quantity: 1 }],
      });
  };

  handleChangeQuantity = (id, num) => {
    if (
      this.state.itemsToCart.length === 0 ||
      !this.state.itemsToCart.some((item) => item.id === id)
    ) {
      this.handleAddItemsToCart(id);
    } else {
      this.setState({
        itemsToCart: this.state.itemsToCart.flatMap((item) =>
          item.id === id
            ? num > 0
              ? item.quantity < 10
                ? [{ ...item, quantity: item.quantity + 1 }]
                : [item]
              : item.quantity > 1
              ? [{ ...item, quantity: item.quantity - 1 }]
              : []
            : [item]
        ),
      });
    }
  };

  handleSortByCategories = () => {
    this.setState({
      data: orderBy(this.state.data, ["category", "title"], ["asc", "asc"]),
    });
  };

  render() {
    const { data, loading, error, itemsToCart } = this.state;

    return (
      <div className="container">
        <Navbar
          itemsToCart={itemsToCart}
          handleSortByCategories={this.handleSortByCategories}
        />
        <h1 className="mb-5">Shopper's Delight</h1>
        <div className="row justify-content-center">
          {!loading ? (
            data.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                handleAddItemsToCart={this.handleAddItemsToCart}
                itemsToCart={itemsToCart}
                handleChangeQuantity={this.handleChangeQuantity}
              />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {error && <h3 className="text-danger">"Error loading data...😐"</h3>}
      </div>
    );
  }
}

export default ShopperContainer;
