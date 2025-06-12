import { formatCurrency } from "@/lib/formatCurrency";
import { imageUrl } from "@/lib/imageUrl";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const orders = await getMyOrders(userId);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
          My orders
        </h1>
        {orders.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>You have no orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {orders.map((order: MY_ORDERS_QUERYResult[0]) => (
              <div
                key={order.orderNumber}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                      <p className="text-sm font-bold text-gray-600 break-all">
                        Order number
                      </p>
                      <p className="text-sm font-mono text-gray-600 break-all">
                        {order.orderNumber}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-sm text-gray-600 mb-1">Order date</p>
                      <p className="font-medium">
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex items-center">
                      <span className="text-sm mr-2">Status:</span>
                      <span
                        className={`px-3 py-1 rounded-full text ${order.status === "paid" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm text-gray-600 mb-1">Total amount</p>
                      <p className="font-bold text-lg">
                        {formatCurrency(
                          order.totalPrice ?? 0,
                          order.currency ?? "USD"
                        )}
                      </p>
                    </div>
                  </div>

                  {order.amountDiscount ? (
                    <div className="mt-4 p-3 sm:p-4 bg-red-50 rounded-lg">
                      <p className="text-sm sm:text-base font-medioum mb-1text-red-600">
                        Discount applayed for this order{" "}
                        {formatCurrency(
                          order.amountDiscount,
                          order.currency ?? "USD"
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        Original subtotal:{" "}
                        {formatCurrency(
                          (order.amountDiscount ?? 0) + (order.totalPrice ?? 0),
                          order.currency ?? "USD"
                        )}
                      </p>
                    </div>
                  ) : null}
                </div>

                {/* order items */}
                <div className="px-4 py-3 sm:px-6 sm:py-4">
                  <p className="text-sm text-gray-600 font-semibold mb-3 sm:mb-4">
                    Order item
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    {order.products?.map((product) => (
                      <div
                        key={product.product?._id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-0"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          {product.product?.image && (
                            <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden">
                              <Image
                                src={imageUrl(product.product.image).url()}
                                alt={product.product.name || "Product image"}
                                className="object-cover"
                                fill
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-sm sm:text-base">
                              {product.product?.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Quantity: {product.quantity ?? "N/A"}
                            </p>
                          </div>
                        </div>

                        <p className="font-medium text-right">
                          {product.product?.price && product.quantity
                            ? formatCurrency(
                                product.product.price * product.quantity,
                                order.currency ?? "USD"
                              )
                            : "N/A"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default OrdersPage;
