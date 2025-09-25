"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Button from "./Button"

type FilterModalProps = {
    isOpen: boolean
    onClose: () => void
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [priceFrom, setPriceFrom] = useState(searchParams.get("price_from") || "")
    const [priceTo, setPriceTo] = useState(searchParams.get("price_to") || "")

    const handleApplyFilters = () => {
        const params = new URLSearchParams(searchParams.toString())

        if (priceFrom) params.set("price_from", priceFrom)
        else params.delete("price_from")

        if (priceTo) params.set("price_to", priceTo)
        else params.delete("price_to")

        // Reset to page 1 when applying filters
        params.delete("page")

        router.push(`/listing?${params.toString()}`)
        onClose();

    }

    if (!isOpen) return null

    return (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-[392px]">
            <h2 className="text-[16px] text-[#10151F] font-semibold mb-5">Select Price</h2>
            <div className="flex gap-2 mb-3">
                <input
                    type="number"
                    placeholder="From"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]  px-3 py-[10px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#ff4000] text-sm w-[175px]"
                />
                <input
                    type="number"
                    placeholder="To"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]  px-3 py-[10px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#ff4000] text-sm w-[175px]"
                />
            </div>

            <Button
                onClick={handleApplyFilters}
                className="ml-auto w-[121px] py-[9px_!important]"
            >
                Apply
            </Button>
        </div>
    )
}
