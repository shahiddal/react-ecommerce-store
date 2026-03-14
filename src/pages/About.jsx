import { Truck, ShieldCheck, Headphones } from "lucide-react";

function About() {
  const teamMembers = [
    { name: "Arjun Mehta", role: "CEO & Founder", img: "32" },
    { name: "Sara Khan", role: "Marketing Head", img: "45" },
    { name: "Vikram Singh", role: "Tech Lead", img: "11" },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      {/*  HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80"
          alt="About"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-indigo-900/70 dark:from-black/90 dark:to-indigo-950/80"></div>

        <div className="relative z-10 px-6 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
            About ShopNest
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200 font-medium">
            We create a seamless and premium online shopping experience for
            modern customers.
          </p>
        </div>
      </section>

      {/*  STORY SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80"
            alt="Our Story"
            className="rounded-[2.5rem] shadow-2xl group-hover:scale-105 transition duration-700 border-8 border-gray-50 dark:border-gray-900"
          />
          <div className="absolute -bottom-6 -right-6 bg-indigo-600 text-white px-10 py-5 rounded-2xl shadow-2xl font-black italic tracking-wider">
            SINCE 2021
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
            Our Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            ShopNest started with a simple idea — to make online shopping
            affordable, stylish, and accessible for everyone in India.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-medium">
            Today, we serve 15,000+ happy customers, delivering premium products
            with fast and secure shipping to every corner of the country.
          </p>
        </div>
      </section>

      {/*  FEATURES SECTION */}
      <section className="bg-gray-50 dark:bg-gray-900/30 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-16 text-gray-900 dark:text-white uppercase tracking-tighter">
            Why Shop With Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck size={32} />,
                title: "Fast Delivery",
                desc: "Super-fast shipping with real-time tracking across India.",
              },
              {
                icon: <ShieldCheck size={32} />,
                title: "Secure Payments",
                desc: "100% safe and encrypted payment system protecting your data.",
              },
              {
                icon: <Headphones size={32} />,
                title: "24/7 Support",
                desc: "Dedicated support team ready to help you anytime, anywhere.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black mb-4 text-gray-900 dark:text-white uppercase italic">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  STATS SECTION */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            ["15K+", "Happy Users"],
            ["8K+", "Products"],
            ["4.9★", "Rating"],
            ["5+", "Years"],
          ].map(([val, label], i) => (
            <div key={i}>
              <h3 className="text-4xl font-black mb-1">{val}</h3>
              <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/*  TEAM SECTION */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-16 text-gray-900 dark:text-white uppercase tracking-tighter">
            Meet Our Founders
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 p-10 rounded-[2.5rem] border border-transparent hover:border-indigo-200 dark:hover:border-indigo-900 transition-all group"
              >
                <img
                  src={`https://i.pravatar.cc/300?img=${member.img}`}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white dark:border-gray-800 shadow-xl group-hover:scale-110 transition-transform duration-500"
                />
                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                  {member.name}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase mt-1 italic">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
