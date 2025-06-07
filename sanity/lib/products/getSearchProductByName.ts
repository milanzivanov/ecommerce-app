import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { Product } from "@/sanity.types";

export const searchProductsByName = async (
  searchTerm: string
): Promise<Product[]> => {
  const SEARCH_PRODUCTS_BY_NAME_QUERY = defineQuery(
    `*[_type == "product" && name match $searchTerm] | order(name asc)`
  );

  try {
    const products = await sanityFetch({
      query: SEARCH_PRODUCTS_BY_NAME_QUERY,
      params: { searchTerm: `*${searchTerm}*` }
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products by name:", error);
    return [];
  }
};
