import { sum } from "ramda";

import useCartItemsStore from "../stores/useCartItemsStore";

export const useCartTotalOf = (products, priceKey) => {
  const cartItems = useCartItemsStore(store => store.cartItems);

  return sum(
    products.map(product => product[priceKey] * cartItems[product.slug])
  );
};
