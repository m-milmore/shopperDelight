import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ShopperService, ShopperTax } from "./services";
import orderBy from "lodash.orderby";
import Navbar from "./components/Navbar/Navbar";
import ShopperContainer from "./components/ShopperContainer/ShopperContainer";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";

const shopper = new ShopperService();
const shopperTax = new ShopperTax();

const App = () => {
  const [appState, setAppState] = React.useState({
    data: [],
    loading: false,
    error: false,
    itemsToCart: [],
    taxes: {},
  });

  React.useEffect(() => {
    setAppState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    shopper.fetchShopperProducts().then(
      (res) => {
        if (res && res.response.ok) {
          setAppState((prevState) => ({
            ...prevState,
            data: res.data,
          }));
          shopperTax.fetchShopperTax().then((res2) => {
            if (res2 && res2.response.ok) {
              setAppState((prevState) => ({
                ...prevState,
                taxes: res2.data,
              }));
            }
          });
        }
        setAppState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      },
      (error) => {
        setAppState((prevState) => ({
          ...prevState,
          loading: false,
          error: true,
        }));
      }
    );
  }, []);

  const handleAddItemsToCart = (id) => {
    appState.itemsToCart.length < 99 &&
      setAppState((prevState) => ({
        ...prevState,
        itemsToCart: [...prevState.itemsToCart, { id, quantity: 1 }],
      }));
  };

  const handleChangeQuantity = (id, num) => {
    if (
      appState.itemsToCart.length === 0 ||
      !appState.itemsToCart.some((item) => item.id === id)
    ) {
      handleAddItemsToCart(id);
    } else {
      setAppState((prevState) => ({
        ...prevState,
        itemsToCart: appState.itemsToCart.flatMap((item) =>
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
      }));
    }
  };

  const handleSortByCategories = () => {
    setAppState((prevState) => ({
      ...prevState,
      data: orderBy(prevState.data, ["category", "title"], ["asc", "asc"]),
    }));
  };

  const handleRemoveItem = (id) => {
    setAppState((prevState) => ({
      ...prevState,
      itemsToCart: prevState.itemsToCart.filter((item) => item.id !== id),
    }));
  };

  const handleInventoryQuantities = () => {
    if (appState.itemsToCart.length > 0) {
      appState.itemsToCart.forEach((item) => {
        setAppState((prevState) => ({
          ...prevState,
          data: prevState.data.map((el) =>
            el.id === item.id
              ? {
                  ...el,
                  quantity: el.quantity - item.quantity,
                }
              : el
          ),
        }));
      });
      setTimeout(() => {
        setAppState((prevState) => ({
          ...prevState,
          itemsToCart: [],
        }));
      }, 250);
    }
  };

  return (
    <Router>
      <div className="container" style={{ textAlign: "center" }}>
        <Navbar
          data={appState.data}
          itemsToCart={appState.itemsToCart}
          handleSortByCategories={handleSortByCategories}
          handleChangeQuantity={handleChangeQuantity}
        />
        <Switch>
          <Route exact path="/">
            <ShopperContainer
              appState={appState}
              handleAddItemsToCart={handleAddItemsToCart}
              handleChangeQuantity={handleChangeQuantity}
            />
          </Route>
          <Route path="/checkout">
            <CheckoutPage
              data={appState.data}
              itemsToCart={appState.itemsToCart}
              taxes={appState.taxes}
              handleRemoveItem={handleRemoveItem}
              handleChangeQuantity={handleChangeQuantity}
              handleInventoryQuantities={handleInventoryQuantities}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
