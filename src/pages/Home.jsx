import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Zap,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import ErrorMessage from "../components/ErrorMessage";

function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categoryRef = useRef(null);
  const navigate = useNavigate();

  const fetchProducts = () => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    // Trending mein sirf smartphones dikhayenge (Premium feel ke liye)
    fetch("https://dummyjson.com/products/category/smartphones?limit=8", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server response error");
        return res.json();
      })
      .then((data) => {
        setTrendingProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(
          navigator.onLine
            ? "Server connection failed"
            : "No internet connection",
        );
        setLoading(false);
      });

    return () => controller.abort();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const scrollToCategory = () => {
    categoryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors">
      {/* HERO SECTION - Purani Image Intact Hai */}
      <section className="relative h-[85vh] flex items-center justify-center text-white text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format"
            alt="Hero"
            className="w-full h-full object-cover scale-105 animate-[zoom_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-white dark:to-gray-950 opacity-90"></div>
        </div>

        <div className="relative z-10 px-6 max-w-4xl animate-fadeIn">
          <div className="flex justify-center mb-6">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-white text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <Sparkles size={14} className="text-yellow-400" /> Premium Tech
              Arrival
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
            DEFINING{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              FUTURE
            </span>{" "}
            STYLE.
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 font-medium max-w-xl mx-auto leading-relaxed">
            Discover the latest in smartphones, laptops, and premium
            accessories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToCategory}
              className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-2xl flex items-center justify-center gap-2 group"
            >
              Shop Now{" "}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
            <Link
              to="/product"
              className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black hover:bg-white/20 transition-all border border-white/10"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl border dark:border-gray-800">
          <div className="flex items-center gap-5 px-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Truck size={28} />
            </div>
            <div>
              <h4 className="font-black dark:text-white">Free Delivery</h4>
              <p className="text-sm text-gray-500">Fast worldwide shipping</p>
            </div>
          </div>
          <div className="flex items-center gap-5 px-4 border-y md:border-y-0 md:border-x dark:border-gray-800">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-2xl text-purple-600">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 className="font-black dark:text-white">Secure Checkout</h4>
              <p className="text-sm text-gray-500">100% Secure payment</p>
            </div>
          </div>
          <div className="flex items-center gap-5 px-4">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-2xl text-orange-600">
              <Zap size={28} />
            </div>
            <div>
              <h4 className="font-black dark:text-white">Warranty</h4>
              <p className="text-sm text-gray-500">Official brand warranty</p>
            </div>
          </div>
        </div>
      </div>

      {/* CLEAN CATEGORY SECTION */}
      <section ref={categoryRef} className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col mb-16">
          <span className="text-indigo-600 font-black tracking-widest text-xs uppercase mb-2">
            Curated Collections
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
            Shop By Category
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {["smartphones", "laptops", "mens-watches", "sunglasses"].map(
            (category, index) => (
              <div
                key={index}
                onClick={() => navigate(`/product?category=${category}`)}
                className="group cursor-pointer relative h-48 overflow-hidden rounded-[2rem] bg-gray-100 dark:bg-gray-900 flex items-center justify-center border dark:border-gray-800"
              >
                <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <h3 className="relative z-10 text-xl font-black text-gray-800 dark:text-white group-hover:text-white transition-colors capitalize">
                  {category.replace("-", " ")}
                </h3>
              </div>
            ),
          )}
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="bg-gray-50 dark:bg-gray-900/20 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter flex items-center gap-4">
                Trending Now <ShoppingBag className="text-indigo-600" />
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Our most loved gadgets this week
              </p>
            </div>
            <Link
              to="/product"
              className="group flex items-center gap-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-xl font-bold dark:text-white shadow-sm hover:shadow-md transition-all"
            >
              See All{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {error ? (
            <ErrorMessage message={error} retryAction={fetchProducts} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading
                ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
                : trendingProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={{ ...p, name: p.title, image: p.thumbnail }}
                    />
                  ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
export default Home;
