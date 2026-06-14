"use client";
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  HTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type Circle = {
  id: number;
  x: number;
  y: number;
  color: string;
  fade: null | "in" | "out";
};

export const HoverInfo = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [listening, setListening] = useState(false);
    const [circles, setCircles] = useState<Circle[]>([]);
    const lastAdded = useRef(0);

    const createCircle = useCallback((x: number, y: number) => {
      const w = containerRef.current?.offsetWidth || 1;
      const pct = (x / w) * 100;
      setCircles((p) => [
        ...p,
        {
          id: Date.now() + Math.random(),
          x,
          y,
          color: `linear-gradient(to right, var(--circle-start) ${pct}%, var(--circle-end) ${pct}%)`,
          fade: null,
        },
      ]);
    }, []);

    useEffect(() => {
      circles.forEach((c) => {
        if (c.fade === null) {
          const t1 = setTimeout(
            () =>
              setCircles((p) =>
                p.map((x) => (x.id === c.id ? { ...x, fade: "in" } : x)),
              ),
            0,
          );
          const t2 = setTimeout(
            () =>
              setCircles((p) =>
                p.map((x) => (x.id === c.id ? { ...x, fade: "out" } : x)),
              ),
            1000,
          );
          const t3 = setTimeout(
            () => setCircles((p) => p.filter((x) => x.id !== c.id)),
            2200,
          );
          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
          };
        }
      });
    }, [circles]);

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        onPointerMove={(e) => {
          if (!listening) return;
          const now = Date.now();
          if (now - lastAdded.current > 100) {
            lastAdded.current = now;
            const r = e.currentTarget.getBoundingClientRect();
            createCircle(e.clientX - r.left, e.clientY - r.top);
          }
        }}
        onPointerEnter={() => setListening(true)}
        onPointerLeave={() => setListening(false)}
        className={cn(
          "relative overflow-hidden inline-flex items-center justify-center cursor-default select-none",
          className,
        )}
        style={
          {
            "--circle-start": "oklch(0.78 0.13 15)",
            "--circle-end": "oklch(0.45 0.05 60)",
          } as React.CSSProperties
        }
        {...props}
      >
        {circles.map((c) => (
          <span
            key={c.id}
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              left: c.x,
              top: c.y,
              width: 600,
              height: 600,
              transform: "translate(-50%, -50%)",
              background: c.color,
              opacity: c.fade === "in" ? 0.35 : 0,
              transition: "opacity 1200ms ease",
              mixBlendMode: "multiply",
            }}
          />
        ))}
        <span className="relative z-10">{children}</span>
      </div>
    );
  },
);
HoverInfo.displayName = "HoverInfo";
