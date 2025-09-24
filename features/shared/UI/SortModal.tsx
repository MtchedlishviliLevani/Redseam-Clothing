"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

type SortModalProps = {
    isOpen: boolean
    onClose: () => void
}

const sortOptions = [
    { value: "created_at", label: "New Product List" },
    { value: "price", label: "Price, low to high" },
    { value: "-price", label: "Price, high to low" }
]

export default function SortModal({ isOpen, onClose }: SortModalProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleSortSelect = (sortValue: string) => {
        const params = new URLSearchParams(searchParams.toString())

        params.set("sort", sortValue)

        // Reset to page 1 when applying sort
        params.delete("page")

        router.push(`/listing?${params.toString()}`)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 min-w-[200px]">
            <h3 className="text-[#10151f] text-[16px] font-medium mb-3">Sort By</h3>

            <div className="space-y-2">
                {sortOptions.map((option) => (
                    <div
                        key={option.value}
                        onClick={() => handleSortSelect(option.value)}
                        className="cursor-pointer p-2 rounded-md transition-colors hover:bg-gray-100 text-[#10151f]"
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    )
}
