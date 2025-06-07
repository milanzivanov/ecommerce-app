import { Product, Category } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import CategorySelectorComponent from "./CategorySelectorComponent";

type ProductsViewProps = {
  products: Product[];
  categories: Category[];
};

function ProductsView({ products, categories }: ProductsViewProps) {
  return (
    <div className="flex flex-col">
      {/* categories */}
      <div className="w-wull sm:w-[200px]">
        <CategorySelectorComponent categories={categories} />
      </div>

      {/* products */}
      <div className="flex">
        <div className="flex-1">
          <ProductGrid products={products} />
          <hr className="w-1/2 sm:w-1/4" />
        </div>
      </div>
    </div>
  );
}
export default ProductsView;
