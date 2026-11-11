"use client";

import { useEffect } from "react";

// One pointer listener lights the reflective edge of every `.card` on screen (cards near the cursor catch it too),
// so the cards themselves stay server components. Scroll reveal is pure CSS (see .reveal in globals.css).
export function Effects() {
  useEffect(() => {
    let raf = 0;
    let x = 0, y = 0;
    const update = () => {
      raf = 0;
      // measure every card first, then write: mixing reads and writes forces a style recalc per card
      const cards = [...document.querySelectorAll<HTMLElement>(".card")].map((el) => [el, el.getBoundingClientRect()] as const);
      for (const [el, r] of cards) {
        if (r.bottom < 0 || r.top > innerHeight) continue; // off screen
        el.style.setProperty("--mx", `${x - r.left}px`);
        el.style.setProperty("--my", `${y - r.top}px`);
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
