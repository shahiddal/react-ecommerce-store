import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-5 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden relative group">
      {/*  Shimmer Animation Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-gray-800/20 to-transparent"></div>

      {/* Image Area */}
      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl mb-5"></div>

      {/* Badge & Rating Area */}
      <div className="flex justify-between mb-3">
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-1/4"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-10"></div>
      </div>

      {/* Title Lines */}
      <div className="space-y-3">
        <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded-lg w-full"></div>
        <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded-lg w-2/3"></div>
      </div>

      {/* Price & Action Area */}
      <div className="flex justify-between items-center mt-8">
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-12"></div>
          <div className="h-7 bg-gray-100 dark:bg-gray-800 rounded-lg w-20"></div>
        </div>
        <div className="h-12 w-12 bg-gray-100 dark:bg-gray-800 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
