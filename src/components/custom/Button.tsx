"use client";
import React from "react";

function Button({ title, disabled = false, isLoading, onClick = () => {} }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none 
        focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
      <span
        className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
          bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]
          ${disabled ? "hidden" : ""}`}
      />
      <span
        className={`inline-flex h-full w-full items-center justify-center rounded-full px-3 py-1 text-sm font-medium 
          text-white backdrop-blur-3xl 
          ${disabled ? "bg-slate-400" : "bg-slate-950"}`}
      >
        {isLoading ? "loading..." : title}
      </span>
    </button>
  );
}

export default Button;
