
import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export default function Button({ label, onClick, type = "button", className }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 ${className}`}
    >
      {label}
    </button>
  );
}
