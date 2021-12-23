import React from "react";
import ShopperService from "../services";
import Navbar from "./Navbar";
import ProductCard from "../components/ProductCard";

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

  handleAddItemsToCart = (id) => (e) => {
    if (this.state.itemsToCart.length < 99) {
      this.setState({ itemsToCart: [...this.state.itemsToCart, id] });
    }
    e.target.disabled = true;
  };

  render() {
    const { data, loading, error, itemsToCart } = this.state;

    return (
      <div className="container">
        <Navbar itemsToCart={itemsToCart} />
        <h1 className="mb-5">Shopper's Delight</h1>
        <div className="row justify-content-center">
          {!loading ? (
            data.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                handleAddItemsToCart={this.handleAddItemsToCart}
                itemsToCart={itemsToCart}
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
