// import React from "react"; // Memo ke liye zaroori hai
// import { ShoppingCart, Heart, Star } from "lucide-react";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { Link } from "react-router-dom";

// // ✅ 1. React.memo: Isse card sirf tabhi re-render hoga jab product data badlega
// const ProductCard = React.memo(({ product }) => {
//   const { addToCart } = useCart();
//   const { wishlist, toggleWishlist } = useWishlist();

//   const isFavorite = wishlist.some((item) => item.id === product.id);

//   // Discount calculate karne ke liye chota sa logic
//   const discount = product.discountPercentage || 10;

//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative">
//       {/* Discount Badge */}
//       <div className="absolute top-4 left-4 z-20 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
//         {Math.round(discount)}% OFF
//       </div>

//       {/* Wishlist Button */}
//       <button
//         onClick={(e) => {
//           e.preventDefault();
//           toggleWishlist(product);
//         }}
//         className={`absolute top-4 right-4 z-20 p-2.5 rounded-full shadow-md transition-all active:scale-75 hover:scale-110 ${
//           isFavorite
//             ? "bg-red-500 text-white"
//             : "bg-white/90 dark:bg-gray-800/90 text-gray-400 hover:text-red-500 backdrop-blur-sm"
//         }`}
//       >
//         <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
//       </button>

//       <Link to={`/product/${product.id}`} className="block h-full">
//         {/* Product Image Container */}
//         <div className="h-60 overflow-hidden bg-gray-50 dark:bg-gray-800/50 relative flex items-center justify-center p-4">
//           <img
//             src={product.image}
//             alt={product.name}
//             loading="lazy" // ✅ Performance: Sirf scroll karne par load hogi
//             className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700"
//             onError={(e) => {
//               e.target.src = "https://via.placeholder.com/300?text=Product";
//             }} // Fallback
//           />
//         </div>

//         {/* Product Info */}
//         <div className="p-6">
//           <div className="flex justify-between items-start">
//             <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
//               {product.category}
//             </span>
//             <div className="flex items-center gap-1 text-orange-500">
//               <Star size={12} fill="currentColor" />
//               <span className="text-xs font-bold">
//                 {product.rating || "4.5"}
//               </span>
//             </div>
//           </div>

//           <h3 className="font-bold text-gray-800 dark:text-white mt-3 text-lg leading-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">
//             {product.name}
//           </h3>

//           <div className="flex items-center justify-between mt-5">
//             <div className="flex flex-col">
//               {/* Original Price (Cut out) */}
//               <span className="text-xs text-gray-400 line-through font-medium">
//                 ${(product.price * 1.2).toFixed(2)}
//               </span>
//               <span className="text-2xl font-black text-gray-900 dark:text-white leading-none">
//                 ${product.price}
//               </span>
//             </div>

//             {/* Add to Cart Button */}
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 addToCart(product);
//               }}
//               className="bg-gray-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700 text-white p-3.5 rounded-2xl transition-all shadow-xl hover:rotate-6 active:scale-90"
//             >
//               <ShoppingCart size={20} />
//             </button>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// });

// export default ProductCard;

// ==========================================================================

import React, { useState } from "react";
import { ShoppingCart, Heart, Star, Eye, Zap } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const ProductCard = React.memo(({ product }) => {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const isFavorite = wishlist.some((item) => item.id === product.id);
  const discount = product.discountPercentage || 15;
  const originalPrice = (product.price / (1 - discount / 100)).toFixed(2);

  // Stock status logic (Real websites use this)
  const isLowStock = product.stock < 10 && product.stock > 0;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-gray-900 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 overflow-hidden"
    >
      {/* 1. Top Badges Container */}
      <div className="absolute top-3 left-3 right-3 z-30 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-1.5">
          <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm pointer-events-auto">
            {Math.round(discount)}% OFF
          </span>
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm pointer-events-auto">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`p-2.5 rounded-xl shadow-sm transition-all active:scale-75 hover:scale-110 pointer-events-auto ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-white/80 dark:bg-gray-800/80 text-gray-400 hover:text-red-500 backdrop-blur-md"
          }`}
        >
          <Heart
            size={18}
            fill={isFavorite ? "currentColor" : "none"}
            strokeWidth={2.5}
          />
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="block">
        {/* 2. Image Section with Quick View Overlay */}
        <div className="aspect-square overflow-hidden bg-[#f9f9f9] dark:bg-gray-800/40 relative flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-contain transition-transform duration-700 ease-out ${
              isHovered ? "scale-110 rotate-2" : "scale-100"
            }`}
          />

          {/* Quick View Overlay (Desktop only) */}
          <div
            className={`absolute inset-0 bg-black/5 backdrop-blur-[2px]  items-center justify-center transition-opacity duration-300 hidden md:flex ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <div className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <Eye size={14} /> View Details
            </div>
          </div>
        </div>

        {/* 3. Info Section */}
        <div className="p-5">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em]">
              {product.brand || product.category}
            </p>
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-orange-50 dark:bg-orange-900/20 rounded-md">
              <Star size={10} className="text-orange-500" fill="currentColor" />
              <span className="text-[11px] font-black text-orange-600 dark:text-orange-400">
                {product.rating || "4.5"}
              </span>
            </div>
          </div>

          <h3 className="font-bold text-gray-800 dark:text-white text-base leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-indigo-600 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Low Stock Alert */}
          {isLowStock && (
            <p className="text-[10px] text-orange-600 font-bold mt-2 flex items-center gap-1">
              <Zap size={10} fill="currentColor" /> Only {product.stock} left!
            </p>
          )}

          <div className="flex items-end justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 line-through mb-0.5 font-medium">
                ${originalPrice}
              </span>
              <span className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-1">
                ${product.price}
                <span className="text-[10px] text-emerald-500 font-bold ml-1 italic">
                  Save ${(originalPrice - product.price).toFixed(0)}
                </span>
              </span>
            </div>

            {/* Add to Cart with Interaction */}
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="group/btn relative bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-2xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-90"
            >
              <ShoppingCart size={20} />
              {/* Tooltip on hover */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap">
                Add to Cart
              </span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
});

export default ProductCard;
