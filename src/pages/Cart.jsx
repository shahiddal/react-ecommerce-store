import { useState } from "react";
import { useCart } from "../context/CartContext";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  X,
  CreditCard,
  Truck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";

function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();
  const navigate = useNavigate();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isPaid, setIsPaid] = useState(false);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SHOPNEST") {
      setDiscount(totalPrice * 0.1);
      toast.success("10% Discount Applied!");
    } else {
      setDiscount(0);
      toast.error("Invalid Code");
    }
  };

  const finalTotal = totalPrice - discount;

  // --- Logic for User-Specific Orders ---
  const handlePlaceOrder = () => {
    // 1. Check logged in user
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser) {
      toast.error("Please login to place order");
      return navigate("/login");
    }

    const newOrder = {
      id: `SN-${Math.floor(100000 + Math.random() * 900000)}`,
      userEmail: currentUser.email, // User ki email chacke
      userName: currentUser.name,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      items: [...cart],
      total: finalTotal.toFixed(0),
      paymentMethod: paymentMethod.toUpperCase(),
      status: "Processing",
    };

    // 2. Save in specific key
    const existingOrders = JSON.parse(
      localStorage.getItem("shopnest_orders") || "[]",
    );
    localStorage.setItem(
      "shopnest_orders",
      JSON.stringify([newOrder, ...existingOrders]),
    );

    toast.success("Order Placed Successfully! ");
    clearCart();
    setIsCheckoutOpen(false);

    setTimeout(() => navigate("/orders"), 1500);
  };
  // --- End of Logic ---

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag size={60} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-8 max-w-xs">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/product"
          className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black mb-12 text-gray-900 dark:text-white uppercase tracking-tighter">
          Shopping Bag
        </h1>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left - Items */}
          <div className="lg:col-span-7 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl group-hover:scale-105 transition-transform"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-black dark:text-white uppercase tracking-tight">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <p className="text-indigo-600 font-black text-xl mt-1">
                    ₹{item.price}
                  </p>

                  <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl p-1 border dark:border-gray-700">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Minus size={14} className="dark:text-white" />
                      </button>
                      <span className="px-5 font-black dark:text-white text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Plus size={14} className="dark:text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl sticky top-28">
              <h2 className="text-xl font-black mb-8 dark:text-white uppercase tracking-tighter">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-gray-900 dark:text-white font-black">
                    ₹{totalPrice}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-bold bg-green-50 dark:bg-green-900/20 p-3 rounded-xl">
                    <span>Discount (10%)</span>
                    <span>- ₹{discount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500 font-medium border-b dark:border-gray-800 pb-4">
                  <span>Shipping</span>
                  <span className="text-green-600 font-black italic">FREE</span>
                </div>
                <div className="flex justify-between text-2xl font-black dark:text-white pt-2">
                  <span>Total</span>
                  <span className="text-indigo-600">
                    ₹{finalTotal.toFixed(0)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mb-8">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="CODE: SHOPNEST"
                  className="flex-1 px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white font-bold text-sm"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-gray-900 dark:bg-indigo-600 text-white px-6 rounded-2xl font-black text-xs uppercase hover:bg-black transition-colors"
                >
                  Apply
                </button>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all transform active:scale-95"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*  Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 max-w-md w-full shadow-2xl relative border dark:border-gray-800">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X size={28} />
            </button>

            <h2 className="text-2xl font-black mb-2 dark:text-white uppercase tracking-tighter">
              Payment
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Choose your preferred payment method to finish.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => {
                  setPaymentMethod("cod");
                  setIsPaid(true);
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === "cod" ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20" : "border-gray-100 dark:border-gray-800"}`}
              >
                <Truck
                  className={
                    paymentMethod === "cod"
                      ? "text-indigo-600"
                      : "text-gray-400"
                  }
                />
                <span
                  className={`text-[10px] font-black uppercase ${paymentMethod === "cod" ? "text-indigo-600" : "text-gray-400"}`}
                >
                  COD
                </span>
              </button>
              <button
                onClick={() => {
                  setPaymentMethod("upi");
                  setIsPaid(false);
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === "upi" ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20" : "border-gray-100 dark:border-gray-800"}`}
              >
                <CreditCard
                  className={
                    paymentMethod === "upi"
                      ? "text-indigo-600"
                      : "text-gray-400"
                  }
                />
                <span
                  className={`text-[10px] font-black uppercase ${paymentMethod === "upi" ? "text-indigo-600" : "text-gray-400"}`}
                >
                  UPI Scan
                </span>
              </button>
            </div>

            {paymentMethod === "upi" ? (
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-3xl text-center mb-8 border dark:border-gray-700">
                <div className="bg-white p-3 rounded-2xl inline-block mb-4 shadow-sm">
                  <QRCodeCanvas
                    value={`upi://pay?pa=shopnest@upi&pn=ShopNest&am=${finalTotal}`}
                    size={140}
                  />
                </div>
                <p className="text-xs font-black dark:text-white uppercase mb-4 tracking-widest">
                  Scan & Pay ₹{finalTotal.toFixed(0)}
                </p>
                <button
                  onClick={() => setIsPaid(true)}
                  className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isPaid ? "bg-green-500 text-white" : "bg-white dark:bg-gray-700 dark:text-white border"}`}
                >
                  {isPaid ? "✓ Verified" : "I have paid"}
                </button>
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-3xl text-center mb-8 border border-green-100 dark:border-green-900/30">
                <p className="text-green-700 dark:text-green-400 text-xs font-bold uppercase italic">
                  ₹{finalTotal.toFixed(0)} will be collected on delivery
                </p>
              </div>
            )}

            <button
              onClick={() => {
                if (!isPaid) return toast.error("Please verify payment");
                handlePlaceOrder();
              }}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all"
            >
              Complete Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
