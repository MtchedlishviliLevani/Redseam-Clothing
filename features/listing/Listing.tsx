import { getProducts, getPaginationInfo } from "@/features/services"
import ListingClient from "@/features/listing/ListingClient"

type ListingProps = { searchParams?: Promise<Record<string, string | string[] | undefined>> }

async function Listing({ searchParams }: ListingProps) {

  const resolvedSearchParams = await searchParams;
  const { price_from, price_to, sort, page } = resolvedSearchParams || {};
  console.log(resolvedSearchParams)
  const asString = (v: string | string[] | undefined) => Array.isArray(v) ? v[0] : v
  const asNumber = (v: string | undefined) => (typeof v !== "undefined" ? Number(v) : undefined)
  const product = await getProducts({
    price_from: asNumber(asString(price_from)),
    price_to: asNumber(asString(price_to)),
    sort: asString(sort),
    page: asNumber(asString(page))
  });

  const { currentPage, totalPages } = getPaginationInfo(product)

  return (
    <ListingClient
      product={product}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}

export default Listing
