import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * @sanity-opinionated.mdc
 * Product schema type definition
 * Defines the structure for product documents in the e-commerce system.
 *
 * @example
 * ```ts
 * // Query products
 * *[_type == "product"] {
 *   name,
 *   price,
 *   "imageUrl": image.asset->url
 * }
 * ```
 */
export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    // Basic product information
    defineField({
      name: "name",
      title: "Product name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),

    // Media and description
    defineField({
      name: "image",
      title: "Product image",
      type: "image",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent"
    }),

    // Pricing and inventory
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.required().min(0)
    }),

    // Categorization
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }]
    })
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      price: "price"
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: `$${select.price}`,
        media: select.media
      };
    }
  }
});
