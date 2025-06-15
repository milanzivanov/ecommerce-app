"use client";

import { imageUrl } from "@/lib/imageUrl";
import { useBasketStore } from "@/store";

import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import AddToBasketButton from "@/components/AddToBasketButton";
import Loader from "@/components/Loader";
import {
  createCheckoutSession,
  Metadata
} from "@/actions/createCheckoutSession";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const user = useUser();
  // const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if the component is mounted
  useEffect(() => setIsClient(true), []);

  const handleCheckOut = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in to checkout");
      return;
    }

    if (groupedItems.length === 0) {
      toast.error("Your basket is empty");
      return;
    }

    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user.user?.fullName ?? "Unknown",
        customerEmail:
          user.user?.primaryEmailAddress?.emailAddress ?? "Unknown",
        clerkUserId: user.user?.id ?? ""
      };

      // Create checkout session
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      // Redirect to checkout page
      // router.push("/checkout");

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error checking out:", error);
      toast.error("Failed to process checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) return <Loader />;

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Your basket</h1>
        <p className="text-gray-600 text-lg">Your basket is empty!!!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl p-4">
      <h1 className="text-2xl font-bold mb-4">Your basket</h1>
      <div className="flex flex-col flex-wrap lg:flex-row gap-4">
        {groupedItems?.map((item) => (
          <div
            key={item.product._id}
            className="p-4 border rounded flex items-center justify-between"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
              <Image
                src={imageUrl(item.product.image ?? "").url()}
                alt={item.product.name ?? "Product image"}
                width={96}
                height={96}
                className="w-full h-full object-cover rounded"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-semibold truncate">
                {item.product.name}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Price: ${((item.product.price ?? 0) * item.quantity).toFixed(2)}
              </p>
            </div>

            <div className="flex items-center md:ml-4 ml-0 flex-shrink-0">
              <AddToBasketButton product={item.product} />
            </div>
          </div>
        ))}
      </div>

      {/* summery section */}
      <div className="mt-4 w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed left-0 lg:left-auto bottom-0 mb-4">
        <h3 className="text-xl font-semibold">Order summary</h3>
        <div className="mt-4 space-y-2">
          <p className="flex justify-between text-gray-600 text-sm">
            <span>Subtotal:</span>
            <span className="font-semibold">
              ${useBasketStore.getState().getTotalPrice().toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      {isSignedIn ? (
        <button
          onClick={handleCheckOut}
          disabled={isLoading}
          className="bg-blue-500 mt-2 md:mt-0 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400"
        >
          {isLoading ? "Processing..." : "Checkout"}
        </button>
      ) : (
        <SignInButton mode="modal">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Signin to checkout
          </button>
        </SignInButton>
      )}

      <div className="h-64 lg:h-8">{/* spacer */}</div>
    </div>
  );
}
export default BasketPage;
