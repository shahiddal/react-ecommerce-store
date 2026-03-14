import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, X, PackagePlus } from "lucide-react";
import { toast } from "react-toastify";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    // LocalStorage se products load karna (Ya initial dummy data)
    const savedProducts = JSON.parse(
      localStorage.getItem("shopnest_products"),
    ) || [
      {
        id: 1,
        name: "iPhone 15 Pro",
        price: "99999",
        category: "Mobile",
        image:
          "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=200",
      },
      {
        id: 2,
        name: "MacBook Air M3",
        price: "114900",
        category: "Laptop",
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200",
      },
    ];
    setProducts(savedProducts);
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = { ...newProduct, id: Date.now() };
    const updatedProducts = [productToAdd, ...products];
    setProducts(updatedProducts);
    localStorage.setItem("shopnest_products", JSON.stringify(updatedProducts));

    // Reset form
    setNewProduct({ name: "", price: "", category: "", image: "" });
    setIsModalOpen(false);
    toast.success("Product Added Successfully!");
  };

  const deleteProduct = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    setProducts(filtered);
    localStorage.setItem("shopnest_products", JSON.stringify(filtered));
    toast.error("Product Removed");
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black dark:text-white uppercase tracking-tighter text-indigo-600">
          Inventory
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-900 p-6 rounded-[2.5rem] border dark:border-gray-800 shadow-sm flex items-center gap-5 group"
          >
            <img
              src={product.image}
              className="w-20 h-20 object-cover rounded-2xl"
              alt={product.name}
            />
            <div className="flex-1">
              <h3 className="font-black dark:text-white text-sm uppercase tracking-tight">
                {product.name}
              </h3>
              <p className="text-indigo-600 font-bold">₹{product.price}</p>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                {product.category}
              </p>
            </div>
            <button
              onClick={() => deleteProduct(product.id)}
              className="text-gray-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 max-w-md w-full relative border dark:border-gray-800 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-black mb-8 dark:text-white uppercase tracking-tighter flex items-center gap-2">
              <PackagePlus className="text-indigo-600" /> New Product
            </h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                required
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:text-white font-bold outline-none"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Price (₹)"
                required
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:text-white font-bold outline-none"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Category"
                required
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:text-white font-bold outline-none"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Image URL"
                required
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:text-white font-bold outline-none"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest mt-4"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageProducts;
