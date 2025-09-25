"use client";
import { useForm } from "react-hook-form";
import { checkout } from "@/features/services/index";
import { useAuthStore, useCartStore } from "@/features/store";
import { useEffect, useState } from "react";
import { CheckoutFormValues } from "@/types";
import SuccessMessage from "@/features/order/SuccessMessage";
import { useRouter } from "next/navigation";
import OrderForm from "@/features/order/OrderForm";
import OrderSidebar from "@/features/order/FormSideBar";

function Order() {
  const isLoggedIn = useAuthStore((store)=>store.isLogged);
  const router = useRouter();
    useEffect(() => {
  if (!isLoggedIn) {
    router.push("/listing");
  }
}, [isLoggedIn, router]);
  const user = useAuthStore((store) => store.user);
  const token = useAuthStore((state) => state.token);
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const onContinue = () => {
    setIsSuccess(false);
    router.push("/listing");
  };


  const { cartItems, fetchCart } = useCartStore()
  useEffect(() => {
    if (token) {
      fetchCart(token);
    }
  }, [token, fetchCart]);
  const totalPrice = cartItems.reduce((acc, item) => {
    const unitPrice = item.price ?? 0;
    const quantity = item.quantity ?? 1;
    return acc + unitPrice * quantity;
  }, 0);


   const formMethods = useForm<CheckoutFormValues>({
    defaultValues: {
      name: "",
      surname: "",
      email: user?.email || "",
      address: "",
      zip_code: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      await checkout(token ?? "", data);
      setIsSuccess(true)
    } catch (error) {
      console.error("Checkout failed:", error);
      setIsSuccess(false)
    }
  };


  return (
    <div className="px-[100px]">
       <div className="mt-18">
      <h1 className="text-[#10151f] font-semibold text-[42px] mb-[42px]">Checkout</h1>

      <form
        className="flex gap-[131px] justify-between"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <OrderForm formMethods={formMethods} />
      {cartItems?.length? <OrderSidebar totalPrice={totalPrice} />:<></>}
      </form>

      {isSuccess && <SuccessMessage onContinue={onContinue} />}
    </div>
    </div>
  );
}

export default Order;
