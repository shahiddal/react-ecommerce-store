import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import ErrorMessage from "../components/ErrorMessage";
import { X, Filter, Search as SearchIcon } from "lucide-react";

function Product() {
  const [products, setProducts] = useState([]);
  const [allCategories, setAllCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);

  const LIMIT = 12;
  const location = useLocation();
  const navigate = useNavigate();

  const PREFERRED_SLUGS = [
    "smartphones",
    "laptops",
    "mens-watches",
    "womens-watches",
    "sunglasses",
    "tablets",
    "mens-shoes",
    "womens-bags",
    "motorcycle",
  ];

  const searchQuery = useMemo(() => {
    return new URLSearchParams(location.search).get("search") || "";
  }, [location.search]);

  // Sidebar Categories Fetching
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        const filteredSlugs = data
          .map((cat) => (typeof cat === "object" ? cat.slug : cat))
          .filter((slug) => PREFERRED_SLUGS.includes(slug));
        setAllCategories(["All", ...filteredSlugs]);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const fetchProductsData = () => {
    setLoading(true);
    setError(null);

    let url = "";

    if (searchQuery) {
      url = `https://dummyjson.com/products/search?q=${searchQuery}&limit=${LIMIT}&skip=${skip}`;
    } else if (activeCategory !== "All") {
      url = `https://dummyjson.com/products/category/${activeCategory}?limit=${LIMIT}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/products/category/smartphones?limit=${LIMIT}&skip=${skip}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // ✅ FETCH FROM LOCAL STORAGE (Admin Products)
        const adminProducts =
          JSON.parse(localStorage.getItem("shopnest_products")) || [];

        // Filter admin products based on category or search if needed
        let filteredAdmin = adminProducts;
        if (activeCategory !== "All") {
          filteredAdmin = adminProducts.filter(
            (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
          );
        }
        if (searchQuery) {
          filteredAdmin = adminProducts.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()),
          );
        }

        // Combine API data with Admin data
        const combinedData =
          skip === 0
            ? [...filteredAdmin, ...data.products]
            : [...products, ...data.products];

        setProducts(combinedData);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProductsData();
  }, [searchQuery, activeCategory, skip]);

  const handleFilterChange = (cat) => {
    setActiveCategory(cat);
    setSkip(0);
    if (searchQuery) navigate("/product");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] sticky top-28 border shadow-sm">
              <h2 className="font-black mb-6 dark:text-white text-[11px] uppercase tracking-widest opacity-50 flex items-center gap-2">
                <Filter size={14} /> Future Style Filter
              </h2>
              <div className="flex flex-col gap-2">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`text-left px-5 py-4 rounded-2xl capitalize font-bold text-sm transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-indigo-600 text-white shadow-xl translate-x-2"
                        : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {cat.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {error ? (
              <ErrorMessage message={error} retryAction={fetchProductsData} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {loading && skip === 0
                  ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                  : products.map((p) => (
                      <ProductCard
                        key={p.id}
                        // Admin products already have name/image correctly mapped from ManageProducts
                        product={
                          p.id > 2000000000000
                            ? p
                            : { ...p, name: p.title, image: p.thumbnail }
                        }
                      />
                    ))}
              </div>
            )}

            {!loading && products.length >= LIMIT && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setSkip((prev) => prev + LIMIT)}
                  className="px-8 py-4 bg-white dark:bg-gray-900 border font-bold rounded-2xl hover:bg-gray-50 dark:text-white"
                >
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
