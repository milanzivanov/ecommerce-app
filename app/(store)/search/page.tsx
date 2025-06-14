import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/getSearchProductByName";

async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);

  if (!products.length) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-7xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            No results for: {query}
          </h1>
          <p className="text-center text-gray-600">
            Try searching for something else.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 left">
          Search results for: {query}
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
export default SearchPage;
