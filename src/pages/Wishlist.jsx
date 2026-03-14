import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import { HeartOff, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-3xl">
            <HeartOff size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              My Wishlist
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Items you've saved for later
            </p>
          </div>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[3rem] shadow-sm border dark:border-gray-800">
            <HeartOff
              size={80}
              className="mx-auto text-gray-200 dark:text-gray-700 mb-6"
            />
            <h2 className="text-2xl font-bold dark:text-white mb-2">
              Your wishlist is empty!
            </h2>
            <p className="text-gray-500 mb-8">
              Start adding items you love to see them here.
            </p>
            <Link
              to="/product"
              className="px-10 py-4 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-indigo-700 transition-all shadow-lg inline-flex items-center gap-2"
            >
              <ShoppingBag size={18} /> Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
