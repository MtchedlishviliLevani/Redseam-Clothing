import Image from "next/image"
import heroImage from "@/features/shared/assets/loginImage.png"
function AuthHero() {
  return (
        <div className="w-[50%] h-full">
          <Image
            src={heroImage}
            alt="login image"
            width={948}
            height={1000}
            sizes="948px"
            className="w-[948px] h-[1000px] object-cover"
          />
        </div>
  )
}

export default AuthHero
