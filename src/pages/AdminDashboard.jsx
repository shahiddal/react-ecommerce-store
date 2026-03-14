import { DollarSign, ShoppingBag, Users, Activity } from "lucide-react";
import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, users: 0 });
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    // 1. Data Fetching from LocalStorage
    const allOrders = JSON.parse(
      localStorage.getItem("shopnest_orders") || "[]",
    );
    const user = JSON.parse(localStorage.getItem("user")); // Current admin

    // Calculate Total Revenue
    const totalRev = allOrders.reduce(
      (acc, curr) => acc + Number(curr.total),
      0,
    );

    setStats({
      revenue: totalRev,
      orders: allOrders.length,
      users: 124, // Mock static count (Real app mein user table se aata)
    });

    // Recent activity (Simulating last logins)
    setRecentUsers([
      { name: "sh12@mail.com", role: "User", status: "Online" },
      { name: "sn12@mail.com", role: "User", status: "Offline" },
      { name: "admin@shopnest.com", role: "Admin", status: "Online" },
    ]);
  }, []);

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${stats.revenue}`,
      icon: <DollarSign />,
      color: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: <ShoppingBag />,
      color: "bg-indigo-600",
    },
    {
      title: "Active Users",
      value: stats.users,
      icon: <Users />,
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <h1 className="text-4xl font-black dark:text-white mb-10 tracking-tighter uppercase text-center md:text-left">
        Admin Control Center
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl border dark:border-gray-800 flex items-center gap-6"
          >
            <div
              className={`${card.color} text-white p-4 rounded-2xl shadow-lg`}
            >
              {card.icon}
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                {card.title}
              </p>
              <h3 className="text-3xl font-black dark:text-white">
                {card.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* User Activity Table */}
      <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 border dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="text-indigo-600" size={20} />
          <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter">
            Live User Activity
          </h2>
        </div>
        <div className="space-y-4">
          {recentUsers.map((u, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-3 w-3 rounded-full ${u.status === "Online" ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                ></div>
                <span className="font-bold dark:text-white text-sm">
                  {u.name}
                </span>
              </div>
              <span className="text-[10px] font-black uppercase bg-white dark:bg-gray-700 px-3 py-1 rounded-full dark:text-gray-300">
                {u.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
