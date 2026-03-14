import { useEffect, useState } from "react";
import { Package, Clock, CheckCircle, ExternalLink } from "lucide-react";

function Orders() {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. LocalStorage se current logged-in user ki info nikalna
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // 2. LocalStorage se saare placed orders fetch karna (Jo Cart.jsx se save huye hain)
    const allPlacedOrders = JSON.parse(
      localStorage.getItem("shopnest_orders") || "[]",
    );

    // 3. Logic: Sirf wahi orders filter karo jo current logged-in user ke email se match karte hain
    const filtered = allPlacedOrders.filter(
      (order) => order.userEmail === currentUser?.email,
    );

    // Realistic delay for loading effect
    const timer = setTimeout(() => {
      setUserOrders(filtered);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [currentUser?.email]);

  if (loading)
    return (
      <div className="h-[60vh] flex items-center justify-center font-black dark:text-white tracking-widest uppercase text-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600"></div>
          Syncing your orders...
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 min-h-screen">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black dark:text-white uppercase tracking-tighter">
            Order History
          </h1>
          <p className="text-gray-500 font-bold text-sm mt-2">
            Showing results for:{" "}
            <span className="text-indigo-600">{currentUser?.email}</span>
          </p>
        </div>
        <div className="hidden md:block">
          <span className="text-xs font-black bg-gray-100 dark:bg-gray-800 dark:text-gray-400 px-4 py-2 rounded-full uppercase">
            {userOrders.length} Orders Found
          </span>
        </div>
      </div>

      {userOrders.length > 0 ? (
        <div className="grid gap-6">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Order Header */}
              <div className="p-6 border-b dark:border-gray-800 flex flex-wrap justify-between items-center bg-gray-50/50 dark:bg-gray-800/30 gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Order ID
                    </p>
                    <p className="font-bold dark:text-white">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Date Placed
                    </p>
                    <p className="font-bold dark:text-white">{order.date}</p>
                  </div>
                </div>
                <div>
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="p-8">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-6 mb-4 last:mb-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-2xl border dark:border-gray-800"
                    />
                    <div className="flex-1">
                      <h3 className="font-black dark:text-white text-sm uppercase tracking-tight">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-bold">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black dark:text-white">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="p-6 px-8 bg-gray-50/20 dark:bg-gray-800/10 flex justify-between items-center border-t dark:border-gray-800">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={14} />
                  <span className="text-[10px] font-black uppercase">
                    Payment: {order.paymentMethod}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase">
                    Total Amount
                  </p>
                  <p className="text-xl font-black text-indigo-600">
                    ₹{order.total}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white dark:bg-gray-900 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
          <div className="inline-flex p-6 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-700 mb-6">
            <Package size={48} />
          </div>
          <h2 className="text-2xl font-black dark:text-white uppercase tracking-tighter">
            No orders yet
          </h2>
          <p className="text-gray-500 font-medium mt-2 mb-8">
            Ready to start your premium tech collection?
          </p>
          <button
            onClick={() => (window.location.href = "/product")}
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Orders;
