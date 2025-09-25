"use client"
import React from "react"
import messageIcon from "@/features/shared/assets/messageIcon.svg"
import Image from "next/image"

interface OrderInputProps {
  type: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}

function OrderInput({ type, placeholder, value, onChange }: OrderInputProps) {
  return (
    <div
      className={`${
        type === "email" ? "w-[578px]" : "w-[277px]"
      } py-2 px-4 bg-white relative border border-[#e1dfe1] rounded-[8px]`}
    >
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-full outline-none placeholder:text-[#3e424a] placeholder:text-[14px] ${
          type === "email" ? "ml-6" : "ml-0"
        }`}
      />
      {type === "email" && (
        <Image
          src={messageIcon}
          alt="email icon"
          width={20}
          height={20}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        />
      )}
    </div>
  )
}

export default OrderInput
