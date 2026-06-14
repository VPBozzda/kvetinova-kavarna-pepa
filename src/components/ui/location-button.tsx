import { useRef, useEffect } from "react";
import gsap from "gsap";

export const LocationButton = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const hoverIn = gsap.to(button, {
      scale: 1.05,
      boxShadow: "0 20px 50px -12px rgba(0,0,0,0.45)",
      duration: 0.35,
      ease: "power2.out",
      paused: true,
    });

    const onEnter = () => hoverIn.play();
    const onLeave = () => hoverIn.reverse();

    button.addEventListener("mouseenter", onEnter);
    button.addEventListener("mouseleave", onLeave);

    return () => {
      hoverIn.kill();
      button.removeEventListener("mouseenter", onEnter);
      button.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a
      ref={buttonRef}
      href="https://maps.app.goo.gl/WrQjicdxU1uv1oSHA"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center overflow-hidden rounded-full border border-cream/10 bg-ink/90 px-8 py-3.5 font-sans-ui text-xs font-semibold uppercase tracking-[0.25em] text-cream/90 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-colors hover:bg-ink"
    >
      <span className="relative z-10">TADY NÁS NAJDETE</span>
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.35) 55%, rgba(255,255,255,0.08) 65%, transparent 75%)",
          backgroundSize: "250% 100%",
          animation: "shimmer 1.2s ease-in-out infinite",
        }}
      />
    </a>
  );
};
