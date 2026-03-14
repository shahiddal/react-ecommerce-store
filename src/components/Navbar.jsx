// import {
//   ShoppingCart,
//   Menu,
//   X,
//   Sun,
//   Moon,
//   Search,
//   ShoppingBag,
//   Info,
//   PhoneCall,
//   Home,
//   Heart,
//   PackageCheck,
//   MoreVertical,
//   User,
//   LogOut,
//   ShieldAlert,
// } from "lucide-react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useTheme } from "../context/ThemeContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useState, useCallback, useRef, useEffect } from "react";

// const navStyle = ({ isActive }) =>
//   `relative flex items-center gap-1.5 px-2 py-1 transition-all
//    duration-300 font-bold text-[12px] uppercase tracking-tight whitespace-nowrap ${
//      isActive
//        ? "text-indigo-600 dark:text-indigo-400"
//        : "text-gray-600 dark:text-gray-300 hover:text-indigo-600"
//    }`;

// function Navbar() {
//   const { cartCount } = useCart();
//   const { darkMode, setDarkMode } = useTheme();
//   const [isOpen, setIsOpen] = useState(false);
//   const [showActions, setShowActions] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [user, setUser] = useState(null);

//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);
//   const searchRef = useRef(null);

//   const isAdmin = user && user.role === "admin";

//   const checkUser = useCallback(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) setUser(JSON.parse(savedUser));
//     else setUser(null);
//   }, []);

//   useEffect(() => {
//     checkUser();
//     window.addEventListener("storage", checkUser);
//     return () => window.removeEventListener("storage", checkUser);
//   }, [checkUser]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     setShowActions(false);
//     navigate("/login");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target))
//         setShowActions(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSearch = (e) => {
//     if (e) e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/product?search=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setIsOpen(false);
//     }
//   };

//   return (
//     <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b dark:border-gray-800 w-full">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 sm:h-20 items-center gap-2 sm:gap-4">
//           {/*  LEFT: Logo */}
//           <Link
//             to="/"
//             className="text-xl sm:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tighter shrink-0"
//           >
//             SHOPNEST
//           </Link>

//           {/*  CENTER: Nav Links (Desktop) */}
//           <div className="hidden xl:flex items-center gap-2 lg:gap-4 flex-1 justify-center min-w-0">
//             {[
//               { to: "/", icon: <Home size={16} />, label: "Home" },
//               {
//                 to: "/product",
//                 icon: <ShoppingBag size={16} />,
//                 label: "Product",
//               },
//               { to: "/about", icon: <Info size={16} />, label: "About" },
//               {
//                 to: "/contact",
//                 icon: <PhoneCall size={16} />,
//                 label: "Contact",
//               },
//             ].map((link) => (
//               <NavLink key={link.to} to={link.to} className={navStyle}>
//                 {({ isActive }) => (
//                   <>
//                     {link.icon}{" "}
//                     <span className="hidden lg:inline">{link.label}</span>
//                     <span
//                       className={`absolute bottom-0 left-0 h-[2px] bg-indigo-600 dark:bg-indigo-400 transition-all ${isActive ? "w-full" : "w-0"}`}
//                     ></span>
//                   </>
//                 )}
//               </NavLink>
//             ))}
//           </div>

//           {/*  RIGHT: Icons & User Section */}
//           <div className="flex items-center gap-1 sm:gap-3 shrink-0 ml-auto">
//             {/* Search Bar (Desktop) */}
//             <div
//               className="hidden lg:flex relative w-40 xl:w-56"
//               ref={searchRef}
//             >
//               <form onSubmit={handleSearch} className="w-full">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-2 border-transparent focus:border-indigo-500 rounded-xl py-1.5 px-8 outline-none text-xs transition-all"
//                 />
//                 <Search
//                   className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
//                   size={14}
//                 />
//               </form>
//             </div>

//             {/* Cart Icon */}
//             <Link
//               to="/cart"
//               className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
//             >
//               <ShoppingCart size={22} />
//               {cartCount > 0 && (
//                 <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center border-2 border-white dark:border-gray-900">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* 3-DOT DROPDOWN  */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setShowActions(!showActions)}
//                 className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-all"
//               >
//                 <MoreVertical size={22} />
//               </button>

//               {showActions && (
//                 <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-900 border dark:border-gray-800 shadow-2xl rounded-2xl py-2 z-[100] animate-in fade-in zoom-in duration-150 overflow-visible">
//                   {/* Small Arrow */}
//                   <div className="absolute -top-1 right-4 w-2 h-2 bg-white dark:bg-gray-900 border-l border-t dark:border-gray-800 rotate-45"></div>

//                   <div className="relative z-10">
//                     <button
//                       onClick={() => setDarkMode(!darkMode)}
//                       className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
//                     >
//                       {darkMode ? (
//                         <Sun size={18} className="text-yellow-500" />
//                       ) : (
//                         <Moon size={18} />
//                       )}
//                       {darkMode ? "LIGHT MODE" : "DARK MODE"}
//                     </button>
//                     <Link
//                       to="/wishlist"
//                       onClick={() => setShowActions(false)}
//                       className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 border-t dark:border-gray-800"
//                     >
//                       <Heart size={18} className="text-red-500" /> WISHLIST
//                     </Link>
//                     <Link
//                       to="/orders"
//                       onClick={() => setShowActions(false)}
//                       className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 border-t dark:border-gray-800"
//                     >
//                       <PackageCheck size={18} className="text-indigo-600" /> MY
//                       ORDERS
//                     </Link>
//                     {user && (
//                       <button
//                         onClick={handleLogout}
//                         className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 border-t dark:border-gray-800"
//                       >
//                         <LogOut size={18} /> LOGOUT ACCOUNT
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* PROFILE & ADMIN (EXTREME END) */}
//             <div className="flex items-center gap-2 border-l dark:border-gray-700 pl-2">
//               {isAdmin && (
//                 <Link
//                   to="/admin/dashboard"
//                   className="p-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700"
//                 >
//                   <ShieldAlert size={18} />
//                 </Link>
//               )}
//               {user ? (
//                 <div className="flex items-center gap-2 bg-indigo-50 dark:bg-gray-800 p-0.5 pr-2 rounded-full border dark:border-gray-700">
//                   <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[10px] font-black uppercase">
//                     {user.name[0]}
//                   </div>
//                   <span className="text-[10px] font-black dark:text-white hidden sm:block uppercase truncate max-w-[60px]">
//                     {user.name}
//                   </span>
//                 </div>
//               ) : (
//                 <Link
//                   to="/login"
//                   className="flex items-center gap-1.5 p-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-all"
//                 >
//                   <User size={20} />
//                   <span className="text-[10px] font-black uppercase hidden sm:block">
//                     Login
//                   </span>
//                 </Link>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="xl:hidden p-2 text-gray-600 dark:text-white ml-1"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {isOpen ? (
//                 <X size={26} className="text-red-500" />
//               ) : (
//                 <Menu size={26} />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/*  MOBILE MENU */}
//       {isOpen && (
//         <div className="xl:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 p-4 space-y-4">
//           <div className="grid grid-cols-2 gap-2">
//             {[
//               { to: "/", icon: <Home size={18} />, label: "Home" },
//               {
//                 to: "/product",
//                 icon: <ShoppingBag size={18} />,
//                 label: "Product",
//               },
//               { to: "/about", icon: <Info size={18} />, label: "About" },
//               {
//                 to: "/contact",
//                 icon: <PhoneCall size={18} />,
//                 label: "Contact",
//               },
//               { to: "/wishlist", icon: <Heart size={18} />, label: "Wishlist" },
//               {
//                 to: "/orders",
//                 icon: <PackageCheck size={18} />,
//                 label: "Orders",
//               },
//             ].map((link) => (
//               <NavLink
//                 key={link.to}
//                 to={link.to}
//                 onClick={() => setIsOpen(false)}
//                 className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl font-bold text-[11px] uppercase dark:text-white"
//               >
//                 <span className="text-indigo-600">{link.icon}</span>{" "}
//                 {link.label}
//               </NavLink>
//             ))}
//           </div>
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="w-full p-3 bg-red-50 text-red-500 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 border border-red-100"
//             >
//               <LogOut size={18} /> Logout Account
//             </button>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

// ====================================================

import {
  ShoppingCart,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  ShoppingBag,
  Info,
  PhoneCall,
  Home,
  Heart,
  PackageCheck,
  MoreVertical,
  User,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useState, useCallback, useRef, useEffect } from "react";

const navStyle = ({ isActive }) =>
  `relative flex items-center gap-1.5 px-2 py-1 transition-all
   duration-300 font-bold text-[12px] uppercase tracking-tight whitespace-nowrap ${
     isActive
       ? "text-indigo-600 dark:text-indigo-400"
       : "text-gray-600 dark:text-gray-300 hover:text-indigo-600"
   }`;

function Navbar() {
  const { cartCount } = useCart();
  const { darkMode, setDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const isAdmin = user && user.role === "admin";

  const checkUser = useCallback(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    else setUser(null);
  }, []);

  useEffect(() => {
    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, [checkUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowActions(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setShowActions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  return (
    // ✅ Added 'w-full' and 'left-0' to ensure it sticks correctly on first load
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm fixed lg:sticky top-0 left-0 w-full z-[100] border-b dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center gap-2">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tighter shrink-0"
          >
            SHOPNEST
          </Link>

          {/* Desktop Links (Hamesha dikhenge Desktop par) */}
          <div className="hidden xl:flex items-center gap-4 flex-1 justify-center">
            {[
              { to: "/", icon: <Home size={16} />, label: "Home" },
              {
                to: "/product",
                icon: <ShoppingBag size={16} />,
                label: "Product",
              },
              { to: "/about", icon: <Info size={16} />, label: "About" },
              {
                to: "/contact",
                icon: <PhoneCall size={16} />,
                label: "Contact",
              },
            ].map((link) => (
              <NavLink key={link.to} to={link.to} className={navStyle}>
                {({ isActive }) => (
                  <>
                    {link.icon} <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-indigo-600 dark:bg-indigo-400 transition-all ${isActive ? "w-full" : "w-0"}`}
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            <form
              onSubmit={handleSearch}
              className="hidden lg:block relative w-40 xl:w-56"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-2 border-transparent focus:border-indigo-500 rounded-xl py-1.5 px-8 outline-none text-xs"
              />
              <Search
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
            </form>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 dark:text-gray-300"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center border-2 border-white dark:border-gray-900">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* 3-Dot Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300"
              >
                <MoreVertical size={22} />
              </button>

              {showActions && (
                <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-900 border dark:border-gray-800 shadow-2xl rounded-2xl py-2 z-[110] animate-in fade-in zoom-in duration-150">
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-white dark:bg-gray-900 border-l border-t dark:border-gray-800 rotate-45"></div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {darkMode ? (
                      <Sun size={18} className="text-yellow-500" />
                    ) : (
                      <Moon size={18} />
                    )}{" "}
                    {darkMode ? "LIGHT MODE" : "DARK MODE"}
                  </button>
                  <Link
                    to="/wishlist"
                    onClick={() => setShowActions(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold dark:text-white border-t dark:border-gray-800"
                  >
                    <Heart size={18} className="text-red-500" /> WISHLIST
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setShowActions(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold dark:text-white border-t dark:border-gray-800"
                  >
                    <PackageCheck size={18} className="text-indigo-600" /> MY
                    ORDERS
                  </Link>
                  {user && (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-500 border-t dark:border-gray-800"
                    >
                      <LogOut size={18} /> LOGOUT ACCOUNT
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 border-l dark:border-gray-700 pl-2">
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="p-2 bg-indigo-600 text-white rounded-xl"
                >
                  <ShieldAlert size={18} />
                </Link>
              )}
              {user ? (
                <div className="flex items-center gap-2 bg-indigo-50 dark:bg-gray-800 p-0.5 pr-2 rounded-full border dark:border-gray-700">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[10px] font-black uppercase">
                    {user.name[0]}
                  </div>
                  <span className="text-[10px] font-black dark:text-white hidden sm:block uppercase truncate max-w-[60px]">
                    {user.name}
                  </span>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 p-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300"
                >
                  <User size={20} />
                  <span className="text-[10px] font-black uppercase hidden sm:block">
                    Login
                  </span>
                </Link>
              )}
            </div>

            {/* Burger Menu Button (Visible on Mobile/Tablet) */}
            <button
              className="xl:hidden p-2 text-gray-600 dark:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X size={26} className="text-red-500" />
              ) : (
                <Menu size={26} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Burger Menu - Full Width fix */}
      {isOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-t dark:border-gray-800 p-4 shadow-2xl z-[100] animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-2 gap-2">
            {[
              { to: "/", icon: <Home size={18} />, label: "Home" },
              {
                to: "/product",
                icon: <ShoppingBag size={18} />,
                label: "Product",
              },
              { to: "/about", icon: <Info size={18} />, label: "About" },
              {
                to: "/contact",
                icon: <PhoneCall size={18} />,
                label: "Contact",
              },
              { to: "/wishlist", icon: <Heart size={18} />, label: "Wishlist" },
              {
                to: "/orders",
                icon: <PackageCheck size={18} />,
                label: "Orders",
              },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl font-bold text-[11px] uppercase dark:text-white"
              >
                <span className="text-indigo-600">{link.icon}</span>{" "}
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
