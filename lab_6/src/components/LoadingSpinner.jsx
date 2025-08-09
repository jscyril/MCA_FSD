import React from "react";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
      <p className="text-gray-600 text-lg font-medium">{message}</p>
      <p className="text-gray-500 text-sm mt-2">
        Please wait while we fetch the latest updates
      </p>
    </div>
  );
};

export default LoadingSpinner;
