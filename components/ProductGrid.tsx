"use client";

import { Product } from "@/sanity.types";
import ProductThumb from "./ProductThumb";
import { AnimatePresence, motion } from "framer-motion";

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <AnimatePresence key={product._id}>
            <motion.div
              layout
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-zinc-50 aspect-square flex justify-center items-center"
            >
              <ProductThumb key={product._id} product={product} />
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
}
export default ProductGrid;
