import { type SchemaTypeDefinition } from "sanity";

// Import all schema types
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { productType } from "./productType";
import { orderType } from "./orderType";
import { salesType } from "./salesType";

/**
 * @sanity-opinionated.mdc
 * This is the main schema configuration file that exports all schema types.
 * Each type is imported from its respective file and combined into a single schema.
 *
 * @example
 * ```ts
 * // Import and use in your Sanity config
 * import { schema } from './schemaTypes'
 * ```
 */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Content types
    blockContentType,
    categoryType,
    productType,

    // Business logic types
    orderType,
    salesType
  ]
};
