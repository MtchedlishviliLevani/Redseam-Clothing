export default function NoProductsFound() {
  return (
    <div className="bg-white shadow-lg  border-orange-500 border rounded-xl p-8 max-w-md text-center px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
        No Products Found 😔
      </h2>
      <p className="text-gray-400 mb-6 max-w-sm">
        No items match your filters. Clear your selection or try a different
        price range.
      </p>
    </div>
  );
}
