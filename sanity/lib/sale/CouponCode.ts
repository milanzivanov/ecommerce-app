export const COUPON_CODS = {
  BFRIDAY: "BFRIDAY",
  XMAS2025: "XMAS2025",
  NY2025: "NY2025"
} as const;

export type CouponCode = keyof typeof COUPON_CODS;
