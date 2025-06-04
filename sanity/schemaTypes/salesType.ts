import { TagIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const salesType = defineType({
  name: "sales",
  title: "Sale",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Sale Title"
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Description",
      description: "Sale description"
    }),
    defineField({
      name: "discountAmount",
      type: "number",
      title: "Discount Amount",
      description: "The amount of discount applied to the sale."
    }),
    defineField({
      name: "couponCode",
      type: "string",
      title: "Coupon Code",
      description: "The code that can be used to apply the discount."
    }),
    defineField({
      name: "validFrom",
      type: "datetime",
      title: "Valid From"
    }),
    defineField({
      name: "validUntil",
      type: "datetime",
      title: "Valid Until"
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Is Active",
      description: "Toggle to activate or deactivate the sale.",
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: "title",
      discountAmount: "discountAmount",
      couponCode: "couponCode",
      isActive: "isActive"
    },
    prepare(selection) {
      const { title, discountAmount, couponCode, isActive } = selection;
      const status = isActive ? "Active" : "Inactive";
      return {
        title,
        subtitle: `${discountAmount}% off - Code: ${couponCode} - (${status})`
      };
    }
  }
});
