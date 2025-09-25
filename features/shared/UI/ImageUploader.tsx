"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import uploadIcon from "@/features/shared/assets/uploadImgIcon.svg";
import { FieldError } from "react-hook-form";
import { ImageUploaderProps } from "@/types";

export default function ImageUploader({
    name,
    label = "Upload Image",
    className = "",
}: ImageUploaderProps) {
    const { register, setValue, watch, setError, clearErrors, formState } = useFormContext();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const fieldValue = watch(name);


    useEffect(() => {
        if (!fieldValue) {
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    }, [fieldValue]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            if (file.size > 1_000_000) {
                setPreview(null);
                setValue(name, null, { shouldValidate: false });
                if (fileInputRef.current) fileInputRef.current.value = "";
                setError(name, { type: "manual", message: "File must be smaller than 1MB" });
                return;
            }
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
            if (!allowedTypes.includes(file.type)) {
                setPreview(null);
                setValue(name, null, { shouldValidate: false });
                if (fileInputRef.current) fileInputRef.current.value = "";
                setError(name, { type: "manual", message: "Allowed formats: jpg, png" });
                return;
            }

            clearErrors(name);
            setValue(name, file, { shouldValidate: true });
            setPreview(URL.createObjectURL(file));
        } else {
            setValue(name, null, { shouldValidate: false });
            setPreview(null);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemove = () => {
        setValue(name, null, { shouldValidate: true });
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const { ref, ...fileReg } = register(name);
const fieldError = formState.errors[name] as FieldError | undefined;
const errorMessage = fieldError?.message;

    return (
        <>

        <div className={className}>
            <input
                type="file"
                accept="image/*"
                className="hidden"
                {...fileReg}
                ref={(el) => {
                    fileInputRef.current = el;
                    ref(el);
                }}
                onChange={handleFileChange}
            />

            {preview ? (
                <Image
                    src={preview}
                    alt="Uploaded Preview"
                    width={100}
                    height={100}
                    className="rounded-full cursor-pointer w-[100px] h-[100px] "
                    onClick={handleUploadClick}
                />
            ) : (
                <Image
                    src={uploadIcon}
                    alt="Upload Image Icon"
                    width={100}
                    height={100}
                    className="cursor-pointer"
                    onClick={handleUploadClick}
                />
            )}

            <div className="mt-2 flex items-center gap-3 text-[#3e424a] text-[14px]">
                {!preview ? (
                    <button
                        className="cursor-pointer"
                        type="button"
                        onClick={handleUploadClick}
                    >
                        {label}
                    </button>
                ) : (
                    <>
                        <button
                            className="cursor-pointer"
                            type="button"
                            onClick={handleUploadClick}
                        >
                            Upload New
                        </button>
                        <button
                            className="cursor-pointer"
                            type="button"
                            onClick={handleRemove}
                        >
                            Remove
                        </button>
                    </>
                )}
            </div>

        </div> 
                   {errorMessage && (
                <p className="mt-2 text-red-600 text-sm">{errorMessage}</p>
            )}
        </>
    );
}
