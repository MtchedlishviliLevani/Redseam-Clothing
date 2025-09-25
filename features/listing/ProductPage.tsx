"use client";
import cartIcon from "@/features/shared/assets/cartIconWhite.svg";
import arrowIcon from "@/features/shared/assets/arrowDownIcon.svg";
import { ProductDetailInfo } from "@/types";
import Button from "@/features/shared/UI/Button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getRandomItem } from "@/features/utils";
import { useAuthStore } from "@/features/store";
import { useRouter } from "next/navigation";
import { addProductToCart } from "@/features/services";
import BrandContent from "@/features/listing/BrandContent";
function ProductPage({
  productDetails,
}: {
  productDetails: ProductDetailInfo;
}) {
  const options = Array.from({ length: 10 }, (_, i) => i + 1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [coverImage, setCoverImage] = useState<string>(
    productDetails?.cover_image ?? ""
  );
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const handleSelect = (value: number) => {
    setSelectedQuantity(value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (productDetails?.available_colors?.length > 0) {
      const initialColor = getRandomItem(productDetails.available_colors) ?? "";
      setSelectedColor(initialColor);

      const colorIndex = productDetails.available_colors.indexOf(initialColor);
      const imageForColor =
        productDetails.images[colorIndex] ?? productDetails.cover_image;
      setCoverImage(imageForColor);
    }

    if (productDetails?.available_sizes?.length > 0) {
      setActiveSize(getRandomItem(productDetails?.available_sizes) ?? "");
    }
  }, [productDetails]);

  const router = useRouter();

  const token = useAuthStore((state) => state.token);
  const isLogged = useAuthStore((state) => state.isLogged);
  async function handleAddToCart() {
    await addProductToCart(
      token ?? "",
      { color: selectedColor, size: activeSize, quantity: selectedQuantity },
      productDetails.id
    );
    router.push("/listing");
  }

  return (
    <div className="mt-18">
      <h3 className="text-[#10151f] text-[14px]">Listing / Product</h3>
      <div className="flex gap-[168px] mt-[49px]">
        <div className="flex gap-6">
          <div className="flex flex-col gap-[9px]">
            {productDetails?.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                width={121}
                height={161}
                className="w-[121px] h-[161px] cursor-pointer shadow-md rounded-[6px]"
                alt="img"
                onClick={() => {
                  setCoverImage(image);
                  const colorForImage = productDetails.available_colors[index];
                  if (colorForImage) setSelectedColor(colorForImage);
                }}
              />
            ))}
          </div>
          <div>
            <Image
              width={703}
              height={937}
              className="w-[703px] h-[937px] rounded-[10px] shadow-lg"
              src={coverImage}
              alt="cover image"
            />
          </div>
        </div>
        <div>
          <h1
            className="text-[
#10151f] text-[32px] font-semibold capitalize mb-[21px]"
          >
            {productDetails?.name}
          </h1>
          <p
            className="text-[
#10151f] text-[32px] font-semibold"
          >
            $ {productDetails?.price}
          </p>

          <div className="my-14 space-y-12">
            <div className="space-y-4">
              <h3 className="text-[#10151f] text-[16px]">
                Color: {selectedColor}
              </h3>
              <div className="flex gap-[13px] items-center">
                {productDetails?.available_colors.map(
                  (color: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedColor(color);
                        const imageForColor =
                          productDetails.images[index] ??
                          productDetails.cover_image;
                        setCoverImage(imageForColor);
                      }}
                      className={`w-12 h-12 rounded-full p-1 border cursor-pointer ${
                        selectedColor === color
                          ? "border-[#e1dfe1] border-[1px]"
                          : "border-gray-300 border-hidden"
                      }`}
                    >
                      <div
                        style={{ backgroundColor: color }}
                        className="w-full h-full rounded-full"
                      />
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[#10151f] text-[16px]">
                Sizes: {activeSize}
              </h3>
              <div className="space-x-2">
                {productDetails?.available_sizes.map((size, index) => (
                  <button
                    onClick={() => setActiveSize(size)}
                    key={index}
                    className={`px-7 py-[9px] rounded-[10px] text-[16px] cursor-pointer border text-[#10151f] 
  ${
    activeSize === size ? "border-[#10151f] bg-[#f8f6f7]" : "border-[#e1dfe1]"
  }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3>Quantity</h3>
              <div className="relative inline-block">
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="w-[70px] h-[42px] flex  justify-center items-center gap-[10px] px-4 py-[9px] 
                   border border-[#e1dfe1] rounded-[10px] bg-white shadow-sm"
                >
                  {selectedQuantity ?? "1"}
                  <Image
                    src={arrowIcon}
                    width={10}
                    height={10}
                    alt="arrow icon"
                  />
                </button>

                {isOpen && (
                  <div className="absolute left-0 top-[30px] mt-2 w-[70px] bg-white border border-[#e1dfe1] rounded-[10px] shadow-md z-10">
                    {options.map((num) => (
                      <div
                        key={num}
                        onClick={() => handleSelect(num)}
                        className="px-3 py-2 text-center cursor-pointer hover:bg-gray-100"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <Button
              disabled={!isLogged}
              className="w-full"
              onClick={handleAddToCart}
              icon={cartIcon}
            >
              Add to cart
            </Button>
          </div>

          <div className="w-full h-[1px] my-[56px] bg-[#e1dfe1]"></div>
          <BrandContent productDetails={productDetails} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
