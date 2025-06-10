import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Typography, Spinner, Button } from "neetoui";
import { isNotNil } from "ramda";
import { useParams } from "react-router-dom";
import routes from "routes";

import Carousel from "./Carousel";

import { useShowProduct } from "../../hooks/reactQuery/useProductsApi";
import { Header } from "../commons";
import AddToCart from "../commons/AddToCard";
import PageNotFound from "../commons/PageNotFound ";

const Product = () => {
  const { slug } = useParams();
  const { data: product = {}, isLoading, isError } = useShowProduct(slug);

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) return <PageNotFound />;

  return (
    <>
      <Header title={name} />
      <div className="px-6 pb-6">
        <div className="mt-6 flex gap-4">
          <div className="w-2/5">
            <div className="flex justify-center gap-16">
              {isNotNil(imageUrls) ? (
                <Carousel />
              ) : (
                <img alt={name} className="w-48" src={imageUrl} />
              )}
            </div>
          </div>
          <div className="w-3/5 space-y-4">
            <Typography>{description}</Typography>
            <Typography>MRP: {mrp}</Typography>
            <Typography className="font-semibold">
              Offer price: {offerPrice}
            </Typography>
            <Typography className="font-semibold text-green-600">
              {discountPercentage}% off
            </Typography>
            <div className="flex space-x-10">
              <AddToCart {...{ slug }} />
              <Button
                className="bg-neutral-800 hover:bg-neutral-950"
                label="Buy now"
                size="large"
                to={routes.checkout}
                onClick={() => setSelectedQuantity(selectedQuantity || 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;
