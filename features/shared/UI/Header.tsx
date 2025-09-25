"use client"
import Image from "next/image"
import logo from "@/features/shared/assets/logo.png"
import userIcon from "@/features/shared/assets/userIcon.svg"
import Link from "next/link"
import { useAuthStore } from "@/features/store"
import { usePathname } from "next/navigation"
import cart from "@/features/shared/assets/cartIcon.svg"
import defaultAvatar from "@/features/shared/assets/defaultAvatar.svg"
import arrow from "@/features/shared/assets/arrowDownIcon.svg"
import { useCartStore } from "@/features/store"
function Header() {
  const isLogged = useAuthStore((state) => state.isLogged);
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();

  const showIconRoutes = ["/listing", "/order"];
  const isListingInner = pathname.startsWith("/listing/"); // inner listing

  const showIcon = showIconRoutes.includes(pathname) || isListingInner;

 

  const openCart = useCartStore((state) => state.openCartModal);

   function handleOpenCart() {
    openCart();
  }
  return (
    <header className="py-[30px] flex justify-between items-center">
      <Link href={"/listing"}><Image src={logo} alt="logo" width={180} height={24} /></Link>
      <div className="flex items-center gap-4">
        {showIcon && (
          <button className="cursor-pointer" onClick={handleOpenCart}>
            <Image src={cart} alt="cart icon" width={20} height={20} />
          </button>
        )}
        {isLogged ? (
          <div className="flex items-center gap-2">
            <Image src={user?.avatar || defaultAvatar} alt="user avatar" width={40} height={40} className="rounded-full cursor-pointer w-[40px] h-[40px]" />
            <Image src={arrow} alt="arrow icon" width={20} height={20} className="w-[12px] h-[12px] cursor-pointer" />
          </div>
        ) : (
          <Link href={"/login"} className="flex items-center gap-2">
            <Image src={userIcon} alt="user icon" width={15} height={15} />
            <span className="text-[12px] text-[#10151f]">Log in</span>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
