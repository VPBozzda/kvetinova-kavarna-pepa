import { useRef, useEffect } from "react";
import gsap from "gsap";

export const LocationButton = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const shine = shineRef.current;
    if (!button || !shine) return;

    const hoverIn = gsap.to(button, {
      scale: 1.05,
      boxShadow: "0 20px 50px -12px rgba(0,0,0,0.45)",
      duration: 0.35,
      ease: "power2.out",
      paused: true,
    });

    const onEnter = () => {
      hoverIn.play();
      gsap.fromTo(
        shine,
        { x: "-200%" },
        { x: "200%", duration: 0.8, ease: "power3.inOut" }
      );
    };

    const onLeave = () => {
      hoverIn.reverse();
    };

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
      <span
        ref={shineRef}
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.18) 55%, transparent 100%)",
        }}
      />
    </a>
  );
};
