"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useAuthStore, useCartStore } from '@/features/store'
import MinusIcon from '@/features/shared/UI/MinusIcon'
import pluseIcon from "@/features/shared/assets/plusIcon.svg"
function CartSelectedItems() {
    const token = useAuthStore((state)=>state.token)
    const {cartItems,decreaseQuantity, fetchCart,increaseQuantity,deleteItem} =useCartStore();
      useEffect(() => {
        if (token) {
          fetchCart(token);
        }
      }, [token, fetchCart]);
  return (
    <>
    {cartItems.map((item) => (<div key={`${item?.id}_${item?.color}_${item?.size}`} className="flex justify-between">
            <div className="flex gap-[17px]">
          <Image src={item?.cover_image} width={100} height={134} alt="Item cover image" className="w-[100px] h-[134px] rounded-[10px] border border-[#E1DFE1]"></Image>

          <div className="flex flex-col justify-between py-2">
            <div className="flex flex-col gap-2">

              <h4 className="text-[#10151F] font-medium text-[14px]">
                {item?.name}
              </h4>

              <p className="text-[12px] text-[#3E424A]">{item?.color}</p>
              <p className="text-[12px] text-[#3E424A]">{item?.size}</p>
            </div>

            <div className="">
              <div className="rounded-[22px] border border-[#e1dfe1] flex items-center py-1 px-[9px] gap-2 max-w-[70px]">
                <button type='button'
                disabled={(item?.quantity??0)<2}
                  onClick={() => decreaseQuantity(token??"",item.id,item?.color??"",item?.size??"")}
                  className="cursor-pointer"
                >
                  <MinusIcon enabled={(item?.quantity ?? 0) > 1} />
                </button>
                <span className="text-[12px] text-[#3e424a]">{item?.quantity}</span>
                <button type='button' onClick={() => increaseQuantity(token??"",item.id,item?.color??"",item?.size??"")} className="cursor-pointer">
                  <Image src={pluseIcon} width={16} height={16} alt="Plus icon" />
                </button>
              </div>
            </div>
          </div>
          </div>

          <div className="flex flex-col justify-between items-end h-[134px] py-2">
            <span className="text-[18px] font-medium text-[#10151F]">$ {item.price}</span>
            <button className="cursor-pointer" onClick={() => deleteItem(token ?? "", item.id, { color: item.color ?? "", size: item.size ?? "" })}>Remove</button>
          </div>
        </div>))}
        </>
  )
}

export default CartSelectedItems
