import Image from "next/image"
import { ProductDetailInfo } from "@/types"
function BrandContent({productDetails}:{productDetails:ProductDetailInfo}) {
  return (
   <div>
               <div className="flex justify-between items-center">
                 <h2 className="text-[#10151F] font-medium text-[20px]">
                   Details
                 </h2>
                 <Image
                   src={productDetails?.brand?.image}
                   width={109}
                   height={61}
                   className="w-[109px] h-[61px]"
                   alt={`${productDetails?.brand?.name} logo`}
                 />
               </div>
               <div className="text-[#3E424A] text-[16px] space-y-[19px]">
                 <h3>Brand:{productDetails?.brand?.name}</h3>
                 <p>{productDetails?.description}</p>
               </div>
             </div>
  )
}

export default BrandContent
