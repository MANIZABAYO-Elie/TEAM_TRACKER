
// import React from "react";

// interface ButtonProps {
//   label: string;
//   onClick?: () => void;
//   type?: "button" | "submit";
//   className?: string;
// }

// export default function Button({ label, onClick, type = "button", className }: ButtonProps) {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 ${className}`}
//     >
//       {label}
//     </button>
//   );
// }

import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "success";
}


const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-purple-500 hover:bg-purple-600 text-white",
  secondary: "bg-blue-500 hover:bg-blue-600 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  success: "bg-green-500 hover:bg-green-600 text-white",
};

export default function Button({
  label,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded transition-colors ${variantStyles[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
