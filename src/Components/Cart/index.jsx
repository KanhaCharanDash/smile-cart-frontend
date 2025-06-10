import { useEffect } from "react";

import productsApi from "apis/products";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import { t } from "i18next";
import { NoData, Toastr } from "neetoui";
import { isEmpty, keys } from "ramda";
import i18n from "src/common/i18n";
import useCartItemsStore from "stores/useCartItemsStore";
import withTitle from "utils/withTitle";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard ";

import { PageLoader } from "../commons";
import Header from "../commons/Header";
import { MRP, OFFER_PRICE } from "../constants";
import { useCartTotalOf } from "../utils";

const Cart = () => {
  const { cartItems, setSelectedQuantity } = useCartItemsStore.pick();
  const slugs = useCartItemsStore(store => keys(store.cartItems));
  const { data: products = [], isLoading } = useFetchCartProducts(slugs);
  const totalOfferPrice = useCartTotalOf(products, OFFER_PRICE);
  const totalMrp = useCartTotalOf(products, MRP);
  const fetchCartProducts = async () => {
    try {
      const responses = await Promise.all(
        slugs.map(slug => productsApi.show(slug))
      );

      responses.forEach(({ availableQuantity, name, slug }) => {
        if (availableQuantity >= cartItems[slug]) return;

        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(t("product.error.removedFromCart", { name }), {
            autoClose: 2000,
          });
        }
      });
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [cartItems]);

  if (isLoading) return <PageLoader />;

  if (isEmpty(products)) {
    return (
      <>
        <Header title="My Cart" />
        <div className="flex h-screen items-center justify-center">
          <NoData title="Your cart is empty!" />
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="My Cart" />
      <div className="mt-10 flex justify-center space-x-10">
        <div className="w-1/3 space-y-5">
          {products.map(product => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
        {totalMrp > 0 && (
          <div className="w-1/4">
            <PriceCard {...{ totalMrp, totalOfferPrice }} />
          </div>
        )}
      </div>
    </>
  );
};

export default withTitle(Cart, i18n.t("cart.title"));
