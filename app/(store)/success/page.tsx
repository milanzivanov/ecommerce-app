"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useBasketStore } from "@/store";

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);

  // const sessionId = searchParams.get("sessionId");

  useEffect(() => {
    clearBasket();
  }, [orderNumber, clearBasket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-lg shadow-lg max-w-2xl w-full mx-4">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">
          Than you for your order!
        </h1>

        <div className="border-b border-t border-gray-200 py-2 px-2 mb-2">
          <p className="text-lg text-gray-700 mb-4">
            Your order has been comfirmed and will be shepped to you soon
          </p>
          <div className="space-y-2">
            {orderNumber && (
              <p className="text-lg text-gray-600 mb-4">
                <span>Order Number: </span>
                <span className="font-mono text-sm text-green-400">
                  {orderNumber}
                </span>
              </p>
            )}
            {/* {sessionId && (
              <p className="text-lg text-gray-600 mb-8 text-center">
                <span>Transaction ID:</span>
                <span className="font-mono text-sm">{sessionId}</span>
              </p>
            )} */}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            A confirmation email has been sent to your email address.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/orders">View order details</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SuccessPage;
