import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function Layout() {
  return (
    // '' footer  bottom
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500">
      <ScrollToTop />

      <Navbar />

      {/*used all space main contact */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
