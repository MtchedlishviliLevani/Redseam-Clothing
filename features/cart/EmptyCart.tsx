import Image from "next/image"
import Button from "@/features/shared/UI/Button"
import shoppingCartIcon from "@/features/shared/assets/shoppingCartIcon.svg"
import closeIcon from "@/features/shared/assets/closeIcon.svg"
interface EmptyCartProps{
totalQuantity:number
,closeCartModal:()=>void
}
function EmptyCart({totalQuantity,closeCartModal}:EmptyCartProps) {
  return (
         <div className="flex flex-col h-full">
        <div className="flex items-center justify-between">
          <h2
            className="text-xl font-medium text-[#10151F]"
          >
            Shopping Cart ({totalQuantity})
          </h2>
          <Image onClick={closeCartModal} src={closeIcon} className="cursor-pointer" width={32} height={32} alt="Close" />
        </div>

        <div className="flex flex-col justify-center items-center flex-1">
          <Image src={shoppingCartIcon} width={120} height={98} alt="Shopping cart" />
          <div className="space-y-[10px] mt-[37px] mb-[50px]">
            <h3 className="text-[#10151F]  font-semibold text-2xl mt-4 text-center">Ooops!</h3>
            <p className="text-[#3E424A] text-[14px] text-center">You’ve got nothing in your cart just yet...</p>
          </div>
          <Button onClick={closeCartModal} className="py-[10px_!important] w-[214px]">Start Shopping</Button>
        </div>
      </div>
  )
}

export default EmptyCart
