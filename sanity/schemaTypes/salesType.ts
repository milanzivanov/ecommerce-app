import { TagIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const salesType = defineType({
  name: "sales",
  title: "Sales",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Sale name",
      type: "string"
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Description",
      description: "Description"
    }),
    defineField({
      name: "discountAmount",
      type: "number",
      title: "Discount Amount",
      description: "The amount of discount applied to the sale."
    }),
    defineField({
      name: "couponCode",
      title: "Coupon Code",
      type: "string",
      description: "The code that can be used to apply the discount."
    }),
    defineField({
      name: "validFrom",
      type: "datetime",
      title: "Valid from"
    }),
    defineField({
      name: "validTo",
      type: "datetime",
      title: "Valid to"
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Toggle to activate or deactivate the sale.",
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: "name",
      discountAmount: "discountAmount",
      couponCode: "couponCode",
      isActive: "isActive"
    },
    prepare(select) {
      const { title, discountAmount, couponCode, isActive } = select;
      const status = isActive ? "Active" : "Inactive";
      return {
        title,
        subtitle: `${discountAmount}% off - Code: ${couponCode} - (${status})`
      };
    }
  }
});
