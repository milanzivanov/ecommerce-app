"use server";

import { stripe } from "@/lib/stripe";
import { BasketItem } from "@/store";
import { imageUrl } from "@/lib/imageUrl";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  console.log("items", items);
  console.log("metadata", metadata);

  try {
    // Check if all items have a price
    const itemsWithoutPrice = items.filter((item) => !item.product.price);

    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some of the items do not have a price.");
    }

    // customers for existing customer by email
    const customer = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1
    });

    let customerId: string | undefined;
    if (customer.data.length > 0) {
      customerId = customer.data[0].id;
    }

    const baseUrl =
      process.env.VERCEL_URL === "production"
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL;

    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

    const cancelUrl = `${baseUrl}/basket`;

    console.log("//////////// successUrl", successUrl);
    console.log("//////// ///// cancelUrl", cancelUrl);

    // session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name ?? "Unnamed product",
            description: `Product ID: ${item.product._id}`,
            metadata: { id: item.product._id },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : undefined
          }
        },
        quantity: item.quantity
      })),
      success_url: successUrl,
      cancel_url: cancelUrl
    });

    // Return the checkout URL
    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}
