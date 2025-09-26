"use client"
import Image from "next/image"
import Button from "@/features/shared/UI/Button"
import { useAuthStore, useCartStore } from "@/features/store"
import closeIcon from "@/features/shared/assets/closeIcon.svg"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import CartSelectedItems from "@/features/cart/CartSelectedItems"
import CartSummary from "@/features/cart/CartSummary"
import EmptyCart from "@/features/cart/EmptyCart"
function Cart() {
  const token = useAuthStore((state) => state.token);

  const {
    closeCartModal,
    cartItems,
    fetchCart
  } = useCartStore();


  useEffect(() => {
    if (token) {
      fetchCart(token);
    }
  }, [token, fetchCart]);


  const router = useRouter();

  const totalPrice = cartItems.reduce((acc, item) => {
    const unitPrice = item.price ?? 0;
    const quantity = item.quantity ?? 1;
    return acc + unitPrice * quantity;
  }, 0);

  const totalQuantity = cartItems.reduce((acc, item) => acc + (item?.quantity ?? 0), 0);

  function redirectTo(path: string) {
    closeCartModal();
    router.push(path);
  }


  if (totalQuantity === 0)return<EmptyCart totalQuantity={totalPrice} closeCartModal={closeCartModal} redirectTo={redirectTo}/>



  return (
    <div className="flex flex-col justify-between gap-[60px] h-full">
      <div className="space-y-[63px]">
        <div className="flex items-center justify-between">
          <h2
            className="text-xl font-medium text-[#10151F]"
          >
            Shopping Cart ({totalQuantity})
          </h2>
          <Image onClick={closeCartModal} src={closeIcon} className="cursor-pointer" width={32} height={32} alt="Close" />
        </div>
        <CartSelectedItems />

      </div>
      <div className="space-y-[102px]">
        <CartSummary totalPrice={totalPrice} />
        <Button onClick={() => redirectTo("/order")} className="w-full py-[18px]">Go to checkout</Button>
      </div>
    </div>
  )
}

export default Cart
