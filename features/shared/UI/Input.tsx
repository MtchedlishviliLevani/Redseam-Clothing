"use client"
import React, { useState } from "react";
import { useFormContext, FieldErrors } from "react-hook-form";
import Image from "next/image";
import eye from "@/features/shared/assets/eyeOff.svg";
import { InputProps } from "@/types/index";


export default function Input({
  name,
  type = "text",
  label,
  required = false,
  className = "",
  rules = {},
}: InputProps) {
  const { register, watch, formState } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const value = watch(name);
  const fieldError = (formState.errors as FieldErrors)?.[name]?.message as string | undefined;
  const effectiveType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`relative ${className}`}>
      <input
        {...register(name, {
          required: required ? `${label} is required` : false,
          ...rules,
        })}
        aria-invalid={fieldError ? "true" : "false"}
        autoComplete="off"
        type={effectiveType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 py-2 border focus:outline-none transition-colors rounded-[8px] ${fieldError ? "border-red-500 focus:border-red-600" : "border-[#e1dfe1] focus:border-[#FF4000]"
          }`}
       
      />

      <div
        className={`absolute left-3 transition-all duration-300 pointer-events-none bg-transparent px-1 ${isFocused || value ? "hidden" : "top-[22px] -translate-y-1/2"
          }`}
      >
        <span className="text-[#3E424A] text-[14px]">{label}</span>
        {required && <span className="text-red-500"> *</span>}
      </div>

      {type === "password" && (
        <Image
          onClick={() => setShowPassword((prev) => !prev)}
          src={eye}
          alt="Toggle password visibility"
          width={20}
          height={20}
          className="absolute right-4 top-[22px] -translate-y-1/2 cursor-pointer"
        />
      )}

      {fieldError ? (
        <p className="mt-2 text-sm text-red-600">{fieldError}</p>
      ) : null}
    </div>
  );
}
