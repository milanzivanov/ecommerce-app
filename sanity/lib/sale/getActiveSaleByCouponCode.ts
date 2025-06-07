import { defineQuery } from "next-sanity";
import { CouponCode } from "./CouponCode";
import { sanityFetch } from "../live";

export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
  const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(
    `*[_type == "sales" && isActive == true && couponCode == $couponCode] | order(validForm desc)[0]`
  );

  try {
    const activeSale = await sanityFetch({
      query: ACTIVE_SALE_BY_COUPON_QUERY,
      params: { couponCode }
    });

    return activeSale.data ? activeSale.data : null;
  } catch (error) {
    console.error("Error faetching active sale by coupon code:", error);
  }
};
