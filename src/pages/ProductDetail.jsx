import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import {
  Star,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Truck,
  RotateCcw,
  Zap,
  Share2,
} from "lucide-react";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  const isInCart = cart?.some((item) => item.id === product?.id);
  const isWishlisted = wishlist?.some((item) => item.id === product?.id);

  const fetchProductData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setSelectedImage(data.thumbnail || data.images?.[0]);

      // Related products fetch logic
      const categoryName =
        typeof data.category === "string" ? data.category : data.category?.slug;
      const relatedRes = await fetch(
        `https://dummyjson.com/products/category/${categoryName}?limit=5`,
      );
      const relatedData = await relatedRes.json();

      if (relatedData.products) {
        setRelatedProducts(
          relatedData.products.filter((p) => p.id !== Number(id)).slice(0, 4),
        );
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductData();
  }, [fetchProductData]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white font-bold animate-pulse">
        Getting product details...
      </div>
    );

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center font-bold dark:bg-gray-950 dark:text-white">
        Product not found!
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Simple Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold transition-all"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <button className="p-2 text-gray-400 hover:text-indigo-600">
            <Share2 size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden border dark:border-gray-800 p-4 aspect-square flex items-center justify-center">
              <img
                src={selectedImage}
                alt={product.title}
                className="max-h-full object-contain"
              />
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`min-w-[80px] h-20 rounded-xl border-2 overflow-hidden transition-all ${
                    selectedImage === img
                      ? "border-indigo-600"
                      : "border-gray-100 dark:border-gray-800"
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt="thumb"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Content */}
          <div className="flex flex-col">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                {product.rating} <Star size={12} fill="currentColor" />
              </div>
              <span
                className={`text-xs font-bold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}
              >
                {product.stock > 0
                  ? `● In Stock (${product.stock})`
                  : "● Out of Stock"}
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-black text-gray-900 dark:text-white">
                ${product.price}
              </span>
              <span className="text-gray-400 line-through text-lg">
                ${(product.price * 1.2).toFixed(2)}
              </span>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-md">
                -{product.discountPercentage}%
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() =>
                  addToCart({
                    ...product,
                    name: product.title,
                    image: product.thumbnail,
                  })
                }
                className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all ${
                  isInCart
                    ? "bg-green-100 text-green-600 border border-green-200"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                <ShoppingCart size={20} />{" "}
                {isInCart ? "In Your Cart" : "Add to Cart"}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-bold border transition-all ${
                  isWishlisted
                    ? "bg-red-50 text-red-500 border-red-100"
                    : "border-gray-200 dark:border-gray-800 text-gray-500 hover:text-red-500"
                }`}
              >
                <Heart
                  size={20}
                  fill={isWishlisted ? "currentColor" : "none"}
                />{" "}
                Wishlist
              </button>
            </div>

            <button
              onClick={() => {
                if (!isInCart)
                  addToCart({
                    ...product,
                    name: product.title,
                    image: product.thumbnail,
                  });
                navigate("/cart");
              }}
              className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 mb-8"
            >
              <Zap size={18} fill="currentColor" /> Checkout Now
            </button>

            {/* Badges */}
            <div className="grid grid-cols-2 gap-4 border-t dark:border-gray-800 pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-indigo-600">
                  <Truck size={20} />
                </div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                  Free Delivery
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-indigo-600">
                  <RotateCcw size={20} />
                </div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                  Easy Returns
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Items */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8 border-l-4 border-indigo-600 pl-4">
              SIMILAR ITEMS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <ProductCard
                  key={rp.id}
                  product={{ ...rp, name: rp.title, image: rp.thumbnail }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
