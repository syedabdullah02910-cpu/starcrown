"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
    };

    let rafId = 0;
    const animateTrail = () => {
      const { x: tx, y: ty } = targetRef.current;
      trailRef.current.x += (tx - trailRef.current.x) * 0.15;
      trailRef.current.y += (ty - trailRef.current.y) * 0.15;
      setTrailPosition({ x: trailRef.current.x, y: trailRef.current.y });
      rafId = requestAnimationFrame(animateTrail);
    };
    rafId = requestAnimationFrame(animateTrail);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("a, button, [role='button'], input, select, textarea, label")) {
        setIsHovering(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const related = e.relatedTarget as HTMLElement | null;
      if (
        target?.closest("a, button, [role='button']") &&
        !related?.closest("a, button, [role='button']")
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        className={`custom-cursor-trail fixed pointer-events-none z-[9998] rounded-full bg-gold/25 transition-[width,height,background-color,box-shadow] duration-200 ${
          isHovering ? "h-4 w-4 bg-gold/40 shadow-gold" : "h-2 w-2"
        }`}
        style={{
          left: trailPosition.x,
          top: trailPosition.y,
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden
      />
      <div
        className={`custom-cursor-dot fixed pointer-events-none z-[9999] rounded-full transition-[width,height,background-color,box-shadow] duration-150 ${
          isHovering
            ? "h-4 w-4 bg-gold shadow-gold-lg scale-110"
            : "h-3 w-3 border border-gold/80 bg-gold/20"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden
      />
    </>
  );
}
