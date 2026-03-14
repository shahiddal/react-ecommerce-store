import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ManageOrders() {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    // Admin saare orders dekh sakta hai
    const orders = JSON.parse(localStorage.getItem("shopnest_orders") || "[]");
    setAllOrders(orders);
  }, []);

  const updateStatus = (orderId) => {
    const updated = allOrders.map((order) =>
      order.id === orderId ? { ...order, status: "Delivered" } : order,
    );
    setAllOrders(updated);
    localStorage.setItem("shopnest_orders", JSON.stringify(updated));
    toast.success("Order status updated!");
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-black dark:text-white mb-8 tracking-tighter uppercase">
        Master Order List
      </h1>

      <div className="grid gap-4">
        {allOrders.length > 0 ? (
          allOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-900 p-6 rounded-3xl border dark:border-gray-800 flex flex-wrap justify-between items-center gap-4"
            >
              <div>
                <p className="text-indigo-600 font-black text-xs uppercase tracking-widest">
                  {order.userEmail}
                </p>
                <h3 className="font-bold dark:text-white">
                  {order.id} - ₹{order.total}
                </h3>
                <p className="text-xs text-gray-400 font-medium">
                  {order.date}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
                {order.status !== "Delivered" && (
                  <button
                    onClick={() => updateStatus(order.id)}
                    className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:scale-105 transition-transform"
                  >
                    Mark Delivered
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-20 text-gray-500 font-bold uppercase tracking-widest">
            No orders to manage
          </p>
        )}
      </div>
    </div>
  );
}

export default ManageOrders;
