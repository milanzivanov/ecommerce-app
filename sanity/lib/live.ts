// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { client } from "./client";
import { defineLive } from "next-sanity";

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_API_TOKEN environment variable");
}

export const { sanityFetch, SanityLive } = defineLive({
  // client: client.withConfig({
  // // Live content is currently only available on the experimental API
  // // https://www.sanity.io/docs/api-versioning
  // apiVersion: "vX"
  // })
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0
  }
});
