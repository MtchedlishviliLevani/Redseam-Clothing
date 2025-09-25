import Listing from '@/features/listing/Listing'
function ListingPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {

  return (
    <Listing searchParams={searchParams} />
  )
}

export default ListingPage
