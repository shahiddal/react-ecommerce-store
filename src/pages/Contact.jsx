import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.message.trim())
      newErrors.message = "Please enter your message";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        toast.success("We received your message!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      }, 1500);
    } else {
      toast.error("Please fill all fields correctly");
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      {/*  HERO SECTION */}
      <section className="bg-indigo-600 dark:bg-indigo-900 text-white py-24 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic">
          Contact Us
        </h1>
        <p className="text-indigo-100 max-w-xl mx-auto font-medium">
          Have a question? We'd love to hear from you. Our team usually responds
          within 24 hours.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12">
        {/*  LEFT SIDE: INFO (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-8">
            Reach Out to Us
          </h2>

          {[
            {
              icon: <Mail />,
              title: "Email",
              value: "support@shopnest.com",
              color: "text-blue-500",
            },
            {
              icon: <Phone />,
              title: "Phone",
              value: "+91 98765 43210",
              color: "text-green-500",
            },
            {
              icon: <MapPin />,
              title: "Address",
              value: "Mumbai, Maharashtra, India",
              color: "text-red-500",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center gap-6 shadow-sm hover:shadow-md transition-all"
            >
              <div
                className={`${item.color} p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl`}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="font-black text-gray-900 dark:text-white uppercase text-sm tracking-widest">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  {item.value}
                </p>
              </div>
            </div>
          ))}

          <div className="p-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2rem] mt-10 border border-indigo-100 dark:border-indigo-900/30">
            <h4 className="font-black text-indigo-900 dark:text-indigo-300 mb-2 uppercase text-xs tracking-widest">
              Support Hours
            </h4>
            <p className="text-indigo-700 dark:text-indigo-400 text-sm font-bold">
              Mon - Sat: 10:00 AM - 7:00 PM IST
            </p>
          </div>
        </div>

        {/*  RIGHT SIDE: FORM (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-100 dark:shadow-none border border-gray-50 dark:border-gray-800">
          <h2 className="text-2xl font-black mb-8 text-gray-900 dark:text-white uppercase tracking-tighter flex items-center gap-3">
            Send a Message <Send size={20} className="text-indigo-600" />
          </h2>

          {submitted && (
            <div className="mb-8 p-4 bg-green-500 text-white rounded-2xl flex items-center gap-3 font-bold animate-pulse">
              <CheckCircle size={20} /> Thank you! Your message has been sent.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 outline-none transition-all ${errors.name ? "border-red-400" : "border-transparent focus:border-indigo-600 dark:text-white"}`}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block mb-2 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 outline-none transition-all ${errors.email ? "border-red-400" : "border-transparent focus:border-indigo-600 dark:text-white"}`}
                  placeholder="name@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                Your Message
              </label>
              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 outline-none transition-all ${errors.message ? "border-red-400" : "border-transparent focus:border-indigo-600 dark:text-white"}`}
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all transform active:scale-95 disabled:opacity-50 shadow-xl shadow-indigo-100 dark:shadow-none"
            >
              {loading ? "Sending..." : "Send Message Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
