import React, { useState } from "react";
import { WifiOff, RefreshCw, AlertCircle } from "lucide-react";

const ErrorMessage = ({ message, retryAction, type = "network" }) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!retryAction) return;
    setIsRetrying(true);

    // Thoda delay taaki user ko feel ho ki retry ho raha hai
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      await retryAction();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 w-full text-center animate-in fade-in zoom-in duration-300">
      <div className="relative mb-6">
        {/* Decorative background glow */}
        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>

        <div className="relative bg-white dark:bg-gray-900 border border-red-100 dark:border-red-900/30 p-6 rounded-[2.5rem] shadow-xl">
          {type === "network" ? (
            <WifiOff size={48} className="text-red-500 animate-pulse" />
          ) : (
            <AlertCircle size={48} className="text-orange-500" />
          )}
        </div>
      </div>

      <h3 className="text-2xl font-black dark:text-white mb-3 uppercase tracking-tighter">
        {type === "network" ? "Oops! Connection Lost" : "Something went wrong"}
      </h3>

      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
        {message ||
          "Hamare server se sampark nahi ho pa raha hai. Krpya apna internet connection check karein aur dobara koshish karein."}
      </p>

      {retryAction && (
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className={`group flex items-center gap-3 bg-gray-900 dark:bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          <RefreshCw
            size={20}
            className={`${isRetrying ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`}
          />
          {isRetrying ? "Retrying..." : "Try Again"}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
