"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// One pointer listener lights the reflective edge of every `.card` on screen (cards near the cursor catch it too),
// and one observer handles every `.reveal` element, so the cards themselves stay server components.
export function Effects() {
  const pathname = usePathname();

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

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      // huge top margin: anything scrolled past (even skipped by a fast scroll) counts as seen
      { rootMargin: "100000px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
