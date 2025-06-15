import { COUPON_CODS } from "@/sanity/lib/sale/CouponCode";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sale/getActiveSaleByCouponCode";

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODS.BFRIDAY);

  if (!sale) return null;

  return (
    <div className="bg-gradient-to-r from-blue-400 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
            {sale.title}
          </h2>
          <p className="text-left text-xl sm:text-3xl font-semibold mb-6">
            {sale.description}
          </p>

          <div className="flex">
            <div className="bg-white text-black px-6 py-4 rounded-full shadow-md transform hover:scale-105 transition duration-300">
              <span className="font-bold text-base sm:text-xl">
                Use code:{" "}
                <span className="text-red-600">{sale.couponCode}</span>
              </span>
              <span className="ml-2 font-bold text-base sm:text-xl">
                for {sale.discountAmount}% OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlackFridayBanner;
