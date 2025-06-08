import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import ProductList from "./Components/ProductList/index";
import PageNotFound from "./Components/commons/PageNotFound ";
import Product from "./Components/Product/index";

const App = () => (
  <>
    <NavLink exact activeClassName="underline font-bold" to="/">
      Home
    </NavLink>
    <NavLink exact activeClassName="underline font-bold" to="/product">
      Product
    </NavLink>
    <Switch>
      <Route exact component={ProductList} path="/products" />
      <Route exact component={Product} path="/products/:slug" />
      <Redirect exact from="/" to="/products" />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);

export default App;
