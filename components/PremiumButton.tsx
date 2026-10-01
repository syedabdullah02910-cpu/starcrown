"use client";

import { ButtonHTMLAttributes, ReactNode, useState } from "react";

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "outline" | "dark";
}

export default function PremiumButton({
  children,
  onClick,
  isLoading = false,
  className = "",
  variant = "primary",
  disabled,
  type = "button",
  ...rest
}: PremiumButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading || disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { x: e.clientX - rect.left, y: e.clientY - rect.top, id },
    ]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
    onClick?.(e);
  };

  const variants = {
    primary:
      "bg-gold-gradient text-dark hover:shadow-gold-lg hover:scale-105 active:scale-95",
    outline:
      "border-2 border-gold text-gold bg-transparent hover:bg-gold/10 hover:scale-105",
    dark: "bg-dark text-gold hover:bg-black hover:scale-105 shadow-xl",
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`relative overflow-hidden px-8 py-3 font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${variants[variant]} ${className}`}
      {...rest}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 8,
            height: 8,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {isLoading && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </span>
    </button>
  );
}
