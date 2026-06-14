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
      scale: 1.06,
      boxShadow: "0 20px 40px -12px rgba(0,0,0,0.25)",
      duration: 0.35,
      ease: "power2.out",
      paused: true,
    });

    const onEnter = () => {
      hoverIn.play();
      gsap.fromTo(
        shine,
        { x: "-150%", opacity: 0 },
        { x: "150%", opacity: 0.6, duration: 1.4, ease: "power2.inOut" }
      );
    };

    const onLeave = () => {
      hoverIn.reverse();
      gsap.to(shine, { x: "-150%", opacity: 0, duration: 0.4, ease: "power2.in" });
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
      className="relative inline-flex items-center overflow-hidden rounded-full border border-rose/20 bg-cream/95 px-8 py-3.5 font-sans-ui text-xs font-semibold uppercase tracking-[0.25em] text-rose shadow-[0_8px_30px_-8px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-colors hover:bg-white"
    >
      <span className="relative z-10">TADY NÁS NAJDETE</span>
      <span
        ref={shineRef}
        className="pointer-events-none absolute inset-0 -translate-x-full"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.85) 50%, transparent 60%)",
        }}
      />
    </a>
  );
};
