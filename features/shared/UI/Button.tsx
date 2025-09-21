import Image from 'next/image' 
import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';
interface ButtonProps {
  children: ReactNode;
  icon?: StaticImageData; // for imported images
  src?: string; // fallback text instead of icon
  onClick?: ()=>void;
  disabled?: boolean;
  className?: string;
}

function Button({ children, icon, src, onClick, disabled, className }: ButtonProps) {

  return (
    <button
  type="submit"
  onClick={onClick}
  disabled={disabled}
  className={`flex justify-center items-center cursor-pointer gap-2 rounded-[10px] bg-[#ff4000] text-white px-4 py-4 disabled:opacity-50 disabled:cursor-not-allowed ${className ?? ""}`}
>
  {icon && <Image src={icon} width={16} height={16} alt="icon" />}
  {src && !icon && <span aria-hidden>{src}</span>}
  {children && <span>{children}</span>}
</button>

  )
}

export default Button
