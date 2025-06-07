import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * @sanity-opinionated.mdc
 * Category schema type definition
 * Defines product categories for organizing the e-commerce catalog.
 *
 * @example
 * ```ts
 * // Query categories with their products
 * *[_type == "category"] {
 *   name,
 *   "products": *[_type == "product" && references(^._id)]
 * }
 * ```
 */
export const categoryType = defineType({
  name: "category",
  title: "Categories",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Category name",
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
    })
  ],
  preview: {
    select: {
      title: "name"
    }
  }
});
