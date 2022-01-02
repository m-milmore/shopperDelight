import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ShopperContainer from "./components/ShopperContainer";
import CheckoutPage from "./components/CheckoutPage";

function App() {
  React.useEffect(() => {
    console.log("App");
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <ShopperContainer />
          </Route>
          <Route path="/checkout">
            <CheckoutPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
