import checkIcon from "@/features/shared/assets/successIcon.svg";
import Image from "next/image";
import Button from "@/features/shared/UI/Button";
import closeIcon from "@/features/shared/assets/closeIcon.svg"
import { SuccessMessageProps } from "@/types";

function SuccessMessage({ onContinue }: SuccessMessageProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onContinue} className="absolute inset-0 bg-black/50"></div>
      <div onClick={(e) => e.stopPropagation()}
       className="relative bg-white w-[876] h-[590px] rounded-2xl p-[30px]  gap-[74px]  z-10 ">
<Image onClick={onContinue} src={closeIcon} width={40} height={40} className="ml-auto cursor-pointer" alt="Close Icon" />

<div className="flex flex-col gap-[74px]">
        <div className="space-y-10 flex flex-col items-center">
          <Image src={checkIcon} width={76} height={76} alt="Success Icon" />
          <div className="space-y-2 text-center">
            <h1 className="text-[42px] text-[#10151F] font-semibold">Congrats!</h1>
            <p className="text-[14px]">Your order is placed successfully!</p>
          </div>
        </div>
        <Button onClick={onContinue} className="w-[214px] m-auto">Continue shopping</Button>
        </div>
      </div>
    </div>
  );
}

export default SuccessMessage;
