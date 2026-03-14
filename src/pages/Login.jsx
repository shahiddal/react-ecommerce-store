import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { toast } from "react-toastify"; // Ensure toast is imported

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Password state added
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      //  Admin Check Logic
      const isAdmin = email === "admin@shopnest.com" && password === "admin123";

      const userData = {
        name: isAdmin ? "Admin" : email.split("@")[0].toUpperCase(),
        email: email,
        role: isAdmin ? "admin" : "user", //  Role setup
      };

      localStorage.setItem("user", JSON.stringify(userData));
      window.dispatchEvent(new Event("storage")); // Navbar update trigger

      toast.success(isAdmin ? "Welcome Admin Panel!" : "Welcome to ShopNest!");

      //  Admin Dashboard par ya Home par redirect
      navigate(isAdmin ? "/admin/dashboard" : "/");
    } else {
      toast.error("Please enter email and password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-2xl border dark:border-gray-800">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black dark:text-white tracking-tighter uppercase">
            Welcome Back
          </h2>
          <p className="text-gray-500 font-medium mt-2">
            Login to your premium account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-5 top-5 text-gray-400" size={20} />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full pl-14 pr-6 py-5 bg-gray-50 dark:bg-gray-800 dark:text-white rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 outline-none font-bold"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-5 top-5 text-gray-400" size={20} />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full pl-14 pr-6 py-5 bg-gray-50 dark:bg-gray-800 dark:text-white rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 outline-none font-bold"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group"
          >
            Login Now{" "}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-2 transition-transform"
            />
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
