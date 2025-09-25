"use client"
import { useState } from "react"
import filterIcon from "@/features/shared/assets/filterIcon.svg"
import arrowIcon from "@/features/shared/assets/arrowDownIcon.svg"
import Image from "next/image"
import { Product } from "@/types/index"
import Pagination from "@/features/listing/Pagination"
import FilterModal from "@/features/shared/UI/FilterModal"
import SortModal from "@/features/shared/UI/SortModal"
import {  useSearchParams } from "next/navigation"
import Link from "next/link"
import { ListingClientProps } from "@/types/index"
import { sortOptions } from "@/features/shared/data"
import { SelectedSort } from "@/features/listing/SelectedSort"
import { SelectedFilters } from "@/features/listing/SelectedFilters"

export default function ListingClient({ product, currentPage, totalPages }: ListingClientProps) {
    const searchParams = useSearchParams()
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [isSortModalOpen, setIsSortModalOpen] = useState(false)

    const currentSort = searchParams.get("sort") || ""
    const currentSortLabel = sortOptions.find(option => option.value === currentSort)?.label || "Sort by";


  
    

    return (
        <>
            <div className="mt-18">
                <div className="flex items-center justify-between">
                    <h1 className="text-[#10151f] text-[42px] font-semibold">Products</h1>

                    <div className="flex items-center gap-8">
                        <p className="text-[12px] text-[#3e424a]">Showing {product?.meta?.from ?? 0}-{product?.meta?.to ?? 0} of {product?.meta.total}</p>
                        <div className="h-[14px] w-[1px] bg-[#e1dfe1]"></div>
                        <div className="relative">
                            <button
                                onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
                                className="text-[16px] text-[#10151f] flex items-center gap-2 cursor-pointer"
                            >
                                <Image src={filterIcon} alt="filter icon" />
                                <span>Filter</span>
                            </button>
                            <FilterModal
                                isOpen={isFilterModalOpen}
                                onClose={() => setIsFilterModalOpen(false)}
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsSortModalOpen(!isSortModalOpen)}
                                className="text-[16px] text-[#10151f] flex items-center gap-2 cursor-pointer"
                            >
                                <span>{currentSortLabel}</span>
                                <Image src={arrowIcon} alt="sort icon" />
                            </button>
                            <SortModal
                                isOpen={isSortModalOpen}
                                onClose={() => setIsSortModalOpen(false)}
                            />
                        </div>
                    </div>
                </div>
                  <div className="flex flex-wrap gap-2  mt-[19px] mb-[26px]">
                <SelectedSort />
                <SelectedFilters />
            </div>

                <main>
                    <div className="grid grid-cols-4 gap-6 my-[32px] gap-y-[48px]">
                        {product?.data?.map((product: Product) => (
                            <div key={product.id}>
                              <Link href={`/listing/${product.id}`}>
                                <Image src={product.cover_image} alt={product.name} width={100} height={100} className="w-full rounded-[10px] shadow-md shadow-gray-400 object-cover" />
                                <div className="mt-3 space-y-[2px]">
                                    <h2 className="text-[#10151f] text-[18px] font-medium capitalize">{product.name}</h2>
                                    <p className="text-[#10151f] text-[16px] font-medium">$ {product.price}</p>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </main>

                <Pagination currentPage={currentPage} totalPages={totalPages} links={product?.links} />
            </div>
        </>
    )
}
