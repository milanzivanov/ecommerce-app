import { Category } from "@/sanity.types";

type CategorySelectorComponentProps = {
  categories: Category[];
};

function CategorySelectorComponent({
  categories
}: CategorySelectorComponentProps) {
  console.log("categories", categories);
  return <div>categories</div>;
}
export default CategorySelectorComponent;
