"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div className="animate-fade-in min-h-screen">{children}</div>;
}
