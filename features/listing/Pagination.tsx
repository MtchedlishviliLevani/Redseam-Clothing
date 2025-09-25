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

  const prevHref = buildPageHref(Math.max(1, currentPage - 1))
  const nextHref = buildPageHref(Math.min(totalPages, currentPage + 1))

  const visiblePages: (number | "...")[] = []

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) visiblePages.push(i)
  } else {
    if (currentPage === 1) {
      visiblePages.push(1, 2, "...", totalPages - 1, totalPages)
    } else if (currentPage === 2) {
      visiblePages.push(1, 2, 3, "...", totalPages - 1, totalPages)
    } else if (currentPage === 3) {
      visiblePages.push(1, 2, 3, 4, "...", totalPages - 1, totalPages)
    } else if (currentPage >= totalPages - 2) {
      visiblePages.push(
        1,
        2,
        "...",
        totalPages - 2,
        totalPages - 1,
        totalPages
      )
    } else {
      visiblePages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      )
    }
  }

  return (
    <div className="flex justify-center items-center gap-2 my-[58px]">
      <Link
        href={hasPrev ? prevHref : "#"}
        aria-disabled={!hasPrev}
        className={!hasPrev ? "pointer-events-none opacity-40" : ""}
      >
        <Image
          src={arrowIcon}
          alt="previous page"
          width={12}
          height={12}
          className="w-[12px] rotate-90 object-cover"
        />
      </Link>
      <div className="flex items-center gap-2">
        {visiblePages.map((p, idx) =>
          p === "..." ? (
            <span key={`dots-${idx}`} className="px-2">
              ...
            </span>
          ) : (
            <Link
              key={p}
              href={buildPageHref(p)}
              className={
                p === currentPage
                  ? "border-[#ff4000] border rounded-[4px] w-8 h-8 text-[#ff4000] flex items-center justify-center"
                  : "w-8 h-8 text-[#212b36] cursor-pointer font-medium opacity-60 flex items-center justify-center"
              }
            >
              {p}
            </Link>
          )
        )}
      </div>
      <Link
        href={hasNext ? nextHref : "#"}
        aria-disabled={!hasNext}
        className={!hasNext ? "pointer-events-none opacity-40" : ""}
      >
        <Image
          src={arrowIcon}
          alt="next page"
          width={12}
          height={12}
          className="w-[12px] rotate-[270deg] object-cover"
        />
      </Link>
    </div>
  )
}

export default Pagination
