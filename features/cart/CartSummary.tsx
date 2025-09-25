function CartSummary({totalPrice}:{totalPrice:number}) {    
  return (
    <div className="space-y-4">
          <div className="flex justify-between items-center"><h2 className="text-[16px] text-[#3e424a]">Items subtotal</h2><span className="text-[16px] text-[#3e424a]">${totalPrice}</span></div>
          <div className="flex justify-between items-center"><h2 className="text-[16px] text-[#3e424a]">Delivery</h2><span className="text-[16px] text-[#3e424a]">$5</span></div>
          <div className="flex justify-between items-center"><h2 className="text-[#10151f] text-xl font-medium">Total</h2><span className="text-[#10151f] text-xl font-medium">${totalPrice + 5}</span></div>
        </div>
  )
}

export default CartSummary
