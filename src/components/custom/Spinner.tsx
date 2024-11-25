"use cleint";
import React from "react";

const GradientSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-16 h-16 border-4 border-transparent border-t-gradient rounded-full animate-spin-gradient"></div>
    </div>
  );
};

export default GradientSpinner;
