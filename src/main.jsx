import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  // createBrowserRouter,
  createHashRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Context Providers
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login.jsx";
import ManageProducts from "./pages/ManageProducts.jsx";

// 1. AuthGuard Component (Normal User Check)
const AuthGuard = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" replace />;
};

// 2. AdminGuard Component (Admin Role Check)
const AdminGuard = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  // Agar user logged in nahi hai ya uska role 'admin' nahi hai, toh use home bhej do
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Optimization: Lazy Loading
const Layout = lazy(() => import("./Layout.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Wishlist = lazy(() => import("./pages/Wishlist.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));
const Orders = lazy(() => import("./pages/Orders.jsx"));

//  Admin Pages (Lazy Load)
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const ManageOrders = lazy(() => import("./pages/ManageOrders.jsx"));

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-gray-950">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div>
  </div>
);

const router = createHashRouter(
  [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<PageLoader />}>
          <AuthGuard>
            <Layout />
          </AuthGuard>
        </Suspense>
      ),
      children: [
        { path: "", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "product", element: <Product /> },
        { path: "contact", element: <Contact /> },
        { path: "cart", element: <Cart /> },
        { path: "wishlist", element: <Wishlist /> },
        { path: "product/:id", element: <ProductDetail /> },
        { path: "orders", element: <Orders /> },
      ],
    },
    // Admin Routes (Adding your requested block)
    {
      path: "/admin",
      element: (
        <Suspense fallback={<PageLoader />}>
          <AdminGuard>
            <Layout />
          </AdminGuard>
        </Suspense>
      ),
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "manage-orders", element: <ManageOrders /> },
        { path: "manage-products", element: <ManageProducts /> },
      ],
    },
  ],
  // {
  //   basename: "/react-ecommerce-store",
  // },
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            theme="colored"
          />
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>,
);
