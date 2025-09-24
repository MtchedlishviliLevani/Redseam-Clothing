"use client"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import arrowIcon from "@/features/shared/assets/arrowDownIcon.svg"
import { PaginationProps } from "@/types"

function Pagination({ currentPage, totalPages, links }: PaginationProps) {
  const searchParams = useSearchParams()
  const hasPrev = Boolean(links?.prev) || currentPage > 1
  const hasNext = Boolean(links?.next) || currentPage < totalPages

  const buildPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(page))
    return `?${params.toString()}`
  }

  const prevHref = links?.prev ? buildPageHref(Math.max(1, currentPage - 1)) : buildPageHref(Math.max(1, currentPage - 1))
  const nextHref = links?.next ? buildPageHref(Math.min(totalPages, currentPage + 1)) : buildPageHref(Math.min(totalPages, currentPage + 1))

  // Create a small window of page buttons around current page
  const visiblePages: number[] = []
  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, currentPage + 2)
  for (let p = start; p <= end; p++) visiblePages.push(p)

  return (
    <div className="flex justify-center items-center gap-2 my-[58px]">
      <Link href={hasPrev ? prevHref : "#"} aria-disabled={!hasPrev} className={!hasPrev ? "pointer-events-none opacity-40" : ""}>
        <Image src={arrowIcon} alt="previous page" width={12} height={12} className="w-[12px] rotate-90  object-cover" />
      </Link>
      <div className="flex items-center gap-2">
        {visiblePages.map((p) => (
          <Link key={p} href={buildPageHref(p)} className={p === currentPage ? "border-[#ff4000] border rounded-[4px] w-8 h-8 text-[#ff4000] flex items-center justify-center" : "w-8 h-8 text-[#212b36] cursor-pointer font-medium opacity-60 flex items-center justify-center"}>
            {p}
          </Link>
        ))}
        {end < totalPages && <span className="px-2">...</span>}
        {end < totalPages && (
          <Link href={buildPageHref(totalPages)} className="w-8 h-8 text-[#212b36] cursor-pointer font-medium opacity-60 flex items-center justify-center">
            {totalPages}
          </Link>
        )}
      </div>
      <Link href={hasNext ? nextHref : "#"} aria-disabled={!hasNext} className={!hasNext ? "pointer-events-none opacity-40" : ""}>
        <Image src={arrowIcon} alt="next page" width={12} height={12} className="w-[12px] rotate-[270deg]  object-cover" />
      </Link>
    </div>
  )
}

export default Pagination
