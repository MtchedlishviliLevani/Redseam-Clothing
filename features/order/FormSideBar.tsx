"use client";
import CartSelectedItems from "@/features/cart/CartSelectedItems";
import CartSummary from "@/features/cart/CartSummary";
import Button from "@/features/shared/UI/Button";
import {OrderSideBarProps} from "@/types/index"

function OrderSidebar({ totalPrice }: OrderSideBarProps) {
  return (
    <div className="flex flex-col gap-[81px] justify-between flex-1  h-[635px]">
      <div className="flex flex-col gap-9 overflow-y-auto">
        <CartSelectedItems />
      </div>
      <CartSummary totalPrice={totalPrice} />
      <Button className="w-full">Pay</Button>
    </div>
  );
}

export default OrderSidebar;
