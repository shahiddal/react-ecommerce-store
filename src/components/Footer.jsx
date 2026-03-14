import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Send,
  MapPin,
  Phone,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand & Mission */}
        <div className="space-y-4">
          <Link
            to="/"
            className="text-2xl font-black text-white tracking-tighter"
          >
            SHOPNEST<span className="text-indigo-500"> @shahid</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Elevating your lifestyle with curated collections. Experience the
            future of premium shopping.
          </p>
          <div className="flex gap-4 pt-2">
            <Facebook
              size={18}
              className="hover:text-indigo-500 cursor-pointer transition-colors"
            />
            <Twitter
              size={18}
              className="hover:text-indigo-500 cursor-pointer transition-colors"
            />
            <Instagram
              size={18}
              className="hover:text-indigo-500 cursor-pointer transition-colors"
            />
          </div>
        </div>

        {/* Quick Navigation - Mapping use karke code clean kiya */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
            Explore
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "All Products", path: "/product" },
              { name: "My Orders", path: "/orders" },
              { name: "About Us", path: "/about" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
            Contact
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-indigo-500 shrink-0" />
              <span>123 Tech Park, Digital City, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-indigo-500 shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-indigo-500 shrink-0" />
              <span>support@shopnest.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter - Better UI */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
            Newsletter
          </h3>
          <p className="text-xs mb-4">
            Get the latest updates on new products and upcoming sales.
          </p>
          <form className="relative overflow-hidden rounded-xl">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-gray-900 border border-gray-800 px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full bg-indigo-600 px-4 hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <Send size={16} className="text-white" />
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>
            © {new Date().getFullYear()} ShopNest. Designed with ❤️ for modern
            shoppers.
          </p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Cookie Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
