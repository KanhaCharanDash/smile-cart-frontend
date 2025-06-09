import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import routes from "routes";

import PageNotFound from "./Components/commons/PageNotFound ";
import Product from "./Components/Product";
import ProductList from "./Components/ProductList";

const App = () => (
  <>
    <NavLink exact activeClassName="underline font-bold" to="/">
      Home
    </NavLink>
    <NavLink exact activeClassName="underline font-bold" to="/product">
      Product
    </NavLink>
    <Switch>
      <Route exact component={Product} path={routes.products.show} />
      <Route exact component={ProductList} path={routes.products.index} />
      <Redirect exact from={routes.root} to={routes.products.index} />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);

export default App;
