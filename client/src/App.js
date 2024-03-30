// App.js
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllProductsPage from "./components/AllProductsPage";
import ProductDetailsPage from "./components/ProductDetailsPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AllProductsPage} />
        <Route path="/product/:productId" component={ProductDetailsPage} />
      </Switch>
    </Router>
  );
}

export default App;
