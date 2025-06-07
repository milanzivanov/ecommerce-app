import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import BlackFridayBanner from "./BlackFridayBanner";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  console.log("products", products);
  console.log("categories", categories);
  return (
    <div>
      {/* banner */}
      <BlackFridayBanner />
      {/* render all products */}
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
