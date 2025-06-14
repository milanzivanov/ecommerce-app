import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * @sanity-opinionated.mdc
 * Order schema type definition
 * Defines the structure for customer orders in the e-commerce system.
 *
 * @example
 * ```ts
 * // Query orders with their products
 * *[_type == "order"] {
 *   orderNumber,
 *   customerName,
 *   "items": products[] {
 *     "product": product->name,
 *     quantity
 *   }
 * }
 * ```
 */
export const orderType = defineType({
  name: "order",
  title: "Orders",
  type: "document",
  icon: BasketIcon,
  fields: [
    // Order identification
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required()
    }),

    // Customer information
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email()
    }),

    // Payment information
    defineField({
      name: "stripeCheckoutSessionId",
      title: "Stripe Checkout Session ID",
      type: "string"
    }),
    defineField({
      name: "stripeCustomerId",
      title: "Stripe Customer ID",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
      validation: (Rule) => Rule.required()
    }),

    // Order details
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }]
            }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.required().min(1)
            })
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              media: "product.image"
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
                media: select.media
              };
            }
          }
        })
      ]
    }),

    // Pricing
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "amountDiscount",
      title: "Amount Discount",
      type: "number",
      validation: (Rule) => Rule.min(0)
    }),

    // Order status
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" }
        ]
      }
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
      email: "email"
    },
    prepare(select) {
      const orderSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
      return {
        title: `${select.name} (${orderSnippet})`,
        subtitle: `${select.amount} ${select.currency} - ${select.email}`,
        media: BasketIcon
      };
    }
  }
});
