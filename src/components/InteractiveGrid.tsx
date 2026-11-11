"use client";

import { useEffect, useRef } from "react";

const GAP = 26; // px between dots
const RADIUS = 130; // cursor influence radius
const ACCENT = [173, 5, 8]; // #AD0508, keep in sync with --accent
const DOT = 1.5; // base dot size, px
const ALPHA = 0.24; // base dot opacity: always visible

// Fixed dot grid behind the page. Dots near the cursor scale up and warm toward the accent.
// Base dots are one cached path (single fill); only the ~150 dots near the cursor are recomputed per frame.
// Animates only while the cursor eases; static under prefers-reduced-motion and on touch.
export function InteractiveGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: -9999, y: -9999 };
    const pos = { x: -9999, y: -9999 };
    let w = 0, h = 0, raf = 0;
    let base = new Path2D();
    let rgb = [245, 245, 244];

    const readColor = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--dot").trim();
      if (v) rgb = v.split(/\s+/).map(Number);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${ALPHA})`;
      ctx.fill(base);
      if (pos.x < -999) return;
      const x0 = Math.max(0, Math.floor((pos.x - RADIUS) / GAP)), x1 = Math.ceil((pos.x + RADIUS) / GAP);
      const y0 = Math.max(0, Math.floor((pos.y - RADIUS) / GAP)), y1 = Math.ceil((pos.y + RADIUS) / GAP);
      for (let j = y0; j <= y1; j++) {
        for (let i = x0; i <= x1; i++) {
          const x = i * GAP + GAP / 2, y = j * GAP + GAP / 2;
          const d = Math.hypot(x - pos.x, y - pos.y);
          if (d >= RADIUS) continue;
          const t = 1 - d / RADIUS;
          const e = t * t * (3 - 2 * t); // smoothstep
          const s = DOT + e * 1.1; // subtle: dots only grow a little
          const c = rgb.map((v, k) => Math.round(v + (ACCENT[k] - v) * e * 0.8));
          ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${ALPHA + e * 0.3})`;
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      base = new Path2D();
      for (let y = GAP / 2; y < h; y += GAP) for (let x = GAP / 2; x < w; x += GAP) base.rect(x - DOT / 2, y - DOT / 2, DOT, DOT);
      draw();
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      draw();
      raf = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (pos.x < -999) {
        pos.x = e.clientX;
        pos.y = e.clientY;
      }
      target.x = e.clientX;
      target.y = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => {
      target.x = target.y = pos.x = pos.y = -9999;
      draw();
    };
    // theme switch changes --dot
    const themeObs = new MutationObserver(() => {
      readColor();
      draw();
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    readColor();
    resize();
    window.addEventListener("resize", resize);
    if (!reduce) {
      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
    }
    return () => {
      cancelAnimationFrame(raf);
      themeObs.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      // fades toward the bottom but never to zero, so the texture stays barely visible
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full [mask-image:radial-gradient(ellipse_at_50%_20%,black_25%,rgb(0_0_0/0.18)_90%)]"
    />
  );
}
