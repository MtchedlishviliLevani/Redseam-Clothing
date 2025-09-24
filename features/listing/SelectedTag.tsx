"use client";

import { MouseEvent } from "react";
import Image from "next/image";
import closeIcon from "@/features/shared/assets/tinyCloseIcon.svg";

type SelectedTagProps = {
    label: string;
    onRemove: () => void;
};

export default function SelectedTag({ label, onRemove }: SelectedTagProps) {
    return (
        <div className="inline-flex items-center justify-between gap-2 text-[14px] text-[#3E424A] border border-[#E1DFE1] rounded-[50px] px-[12px] py-2">
            <span>{label}</span>
            <button
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    onRemove();
                }}
            >
                <Image src={closeIcon} width={7} height={7} alt="Close Icon" />
            </button>
        </div>
    );
}
