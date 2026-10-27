import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  className?: string;
  disable?: boolean;
  noScale?: boolean;
}

const Button = ({
  children,
  to,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disable = false,
  noScale = false,
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-white dark:text-gray-950 font-semibold hover:bg-primary-hover shadow-sm shadow-black/10 dark:shadow-emerald-500/20",
    outline:
      "border border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/15",
    ghost:
      "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white",
  };
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (to) {
    return (
      <NavLink to={to} className={combinedClasses} onClick={onClick}>
        {children}
      </NavLink>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disable}
      className={combinedClasses}
      whileHover={disable || noScale ? undefined : { scale: 1.03 }}
      whileTap={disable || noScale ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
