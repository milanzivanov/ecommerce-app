import { Product, Category } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "@/components/ui/categort-selector";

type ProductsViewProps = {
  products: Product[];
  categories: Category[];
};

function ProductsView({ products, categories }: ProductsViewProps) {
  return (
    <div className="flex flex-col">
      {/* categories */}
      <div className="w-full sm:w-[200px] mb-4">
        <CategorySelectorComponent categories={categories} />
      </div>

      {/* products */}
      <div className="flex">
        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
export default ProductsView;
