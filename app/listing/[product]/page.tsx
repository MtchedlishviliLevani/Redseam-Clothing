import { getProductDetails } from "@/features/services";
import { ProductDetailInfo } from "@/types";
import ProductPage from "@/features/listing/ProductPage";
export default async function Product({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const productDetails: ProductDetailInfo = await getProductDetails(
    Number(product)
  );
  return (

    <ProductPage productDetails={productDetails}/>
  );
}
