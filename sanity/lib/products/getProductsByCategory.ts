import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { Product } from "@/sanity.types";

export const getProductsByCategory = async (
  categorySlug: string
): Promise<Product[]> => {
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(
    `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)]`
  );

  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: { categorySlug }
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
