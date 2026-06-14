import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from "lenis";
import { Toaster } from "sonner";

import img2342 from "@/assets/IMG_2342.asset.json";
import img2343 from "@/assets/IMG_2343.asset.json";
import img2345 from "@/assets/IMG_2345.asset.json";
import img2348 from "@/assets/IMG_2348.asset.json";
import img2349 from "@/assets/IMG_2349.asset.json";
import img2350 from "@/assets/IMG_2350.asset.json";
import img2351 from "@/assets/IMG_2351.asset.json";
import owners from "@/assets/owners.asset.json";
import glassware from "@/assets/glassware.asset.json";
import interior from "@/assets/interior-table.asset.json";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Květinová Kavárna Pe&Pa — Karlštejn 16" },
      { name: "description", content: "Old-fashioned květinová kavárna pod Karlštejnem. Káva, domácí dezerty, vůně růží a starých časů. Pepina & Pavla vás zvou." },
      { property: "og:title", content: "Květinová Kavárna Pe&Pa — Karlštejn 16" },
      { property: "og:description", content: "Romantická kavárna pod Karlštejnem. Káva, koláče a kouzlo starých časů." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Pinyon+Script&family=Inter:wght@400;500&display=swap" },
    ],
  }),
  component: Index,
});

const coffee = [
  ["Espresso", 55], ["Lungo", 60], ["Doppio", 75], ["Macchiato", 65],
  ["Cappuccino", 65], ["Latte", 75], ["Latte Macchiato", 75],
  ["Flat White", 85], ["Espresso Tonic", 70],
];
const desserts = [
  ["Mošedaján", 79], ["Rebarborovo-jahodový koláč", 69], ["Švestkový koláč s mákem", 69],
  ["Bábovka", 65], ["Kávová bábovka", 65],
];
const drinks = [
  ["Limonáda (borůvka, máta-citron, bezinková)", 45],
  ["Plzeň 0,3", 60], ["Víno 1dcl / 2dcl", "45 / 65"],
  ["Prosecco", 35], ["Aperol Spritz", 125],
];

function Petals() {
  const petals = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {petals.map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i * 0.7) % 12;
        const dx = (i % 2 === 0 ? 1 : -1) * (20 + (i * 13) % 80);
        const size = 8 + (i % 5) * 3;
        return (
          <span
            key={i}
            className="animate-petal absolute -top-10 block"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              ["--dx" as string]: `${dx}px`,
            }}
          >
            <svg width={size} height={size} viewBox="0 0 20 20">
              <ellipse cx="10" cy="10" rx="5" ry="9" fill="oklch(0.78 0.13 15 / 0.7)" />
            </svg>
          </span>
        );
      })}
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const fullText = "Zastavte se na babiččin koláč a poctivou kávu přímo na cestě na Karlštejn. Vše děláme ručně, pomalu a od srdce.";
  const typed = useTransform(scrollYProgress, [0, 0.5], [0, fullText.length]);
  const [shown, setShown] = useState("");
  useEffect(() => {
    return typed.on("change", (v) => {
      const n = Math.max(0, Math.min(fullText.length, Math.round(v)));
      setShown(fullText.slice(0, n));
    });
  }, [typed]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden">
      <motion.div style={{ y: yBack, scale }} className="absolute inset-0">
        <img
          src={img2345.url}
          alt="Květinová Kavárna Pe&Pa pod Karlštejnem"
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.62) saturate(0.85) contrast(1.05) sepia(0.18)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.2_0.02_30/0.15)_0%,_oklch(0.15_0.02_30/0.55)_85%)]" />
      </motion.div>

      <motion.div
        style={{ y: yFront, opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <span className="font-sans-ui text-xs uppercase tracking-[0.4em] text-cream/90">
          Karlštejn · č.p. 16
        </span>
        <h1 className="mt-4 text-[clamp(2.5rem,9vw,6.5rem)] leading-[0.9] drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]">
          <span className="block italic text-cream">Květinová</span>
          <span className="font-script -mt-2 block text-[clamp(3.25rem,11vw,8rem)] text-rose">
            Kavárna
          </span>
          <span className="mt-2 block text-xl tracking-[0.5em] text-cream/95 md:text-2xl">
            PE &amp; PA
          </span>
        </h1>

        <p className="mt-8 min-h-[6rem] max-w-2xl font-display text-xl leading-relaxed text-cream/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:min-h-[7rem] md:text-2xl">
          {shown}
          <span className="ml-0.5 inline-block w-[2px] -translate-y-1 animate-pulse bg-rose align-middle" style={{ height: "1.1em" }} />
        </p>

        <p className="mt-8 font-sans-ui text-sm font-medium uppercase tracking-[0.3em] text-cream/90">
          Objednávku vám rádi zabalíme s sebou
        </p>
      </motion.div>

      <div className="pointer-events-none absolute left-2 top-0 h-40 w-2 origin-top animate-sway bg-gradient-to-b from-moss/40 to-transparent" />
      <div className="pointer-events-none absolute right-6 top-0 h-52 w-1 origin-top animate-sway bg-gradient-to-b from-moss/30 to-transparent" style={{ animationDelay: "1.5s" }} />

      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-cream/80">
        ↓ scroll
      </div>
    </section>
  );
}

function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -40]);
  const rot = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  return (
    <section ref={ref} className="relative py-32 md:py-48">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <div className="relative h-[420px] md:h-[560px]">
          <motion.img
            src={img2349.url}
            alt="Interiér kavárny"
            style={{ y: y1, rotate: rot }}
            className="paper-card absolute left-0 top-0 h-[72%] w-[78%] rounded-md object-cover p-2"
          />
          <motion.img
            src={img2350.url}
            alt="Květiny na stole"
            style={{ y: y2 }}
            className="paper-card absolute bottom-0 right-0 h-[58%] w-[62%] rounded-md object-cover p-2"
          />
        </div>
        <div>
          <span className="font-sans-ui text-xs uppercase tracking-[0.4em] text-moss">Naše story</span>
          <h2 className="mt-3 text-5xl md:text-6xl">
            Dvě dámy, <em className="text-rose">jeden</em> sen.
          </h2>
          <p className="mt-6 font-display text-xl leading-relaxed text-muted-foreground">
            Pepina a Pavla otevřely Květinovou Kavárnu, aby vrátily kousek babiččiných časů
            zpátky pod karlštejnský kopec. Květované tapety, sametové polštáře, krajkové ubrousky
            a v každém šálku něco, co voní jako neděle.
          </p>
          <p className="mt-4 font-script text-3xl text-rose">— S láskou, Pe &amp; Pa</p>
        </div>
      </div>
    </section>
  );
}

function OpeningHours() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <span className="font-sans-ui text-xs uppercase tracking-[0.4em] text-moss">Návštěva</span>
        <h2 className="mt-3 text-5xl md:text-6xl">Kdy jsme <em className="text-rose">otevřeni</em></h2>

        <div className="mt-10 inline-block rounded-lg border border-border bg-cream/70 px-10 py-8 shadow-sm backdrop-blur-sm">
          <p className="font-display text-2xl leading-relaxed text-foreground md:text-3xl">
            <span className="font-script text-4xl text-rose md:text-5xl">Sobota</span>
            <span className="mx-3 text-muted-foreground">—</span>
            <span className="font-script text-4xl text-rose md:text-5xl">Neděle</span>
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-border" />
          <p className="mt-4 font-sans-ui text-lg tracking-wider text-foreground md:text-xl">
            9:30 <span className="text-muted-foreground">až</span> 18:00
          </p>
        </div>

        <p className="mt-8 font-display text-lg italic text-muted-foreground">
          Těšíme se na vás každý víkend pod karlštejnským kopcem.
        </p>
      </div>
    </section>
  );
}

function OwnersHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} className="relative h-[85vh] overflow-hidden">
      <motion.img
        src={owners.url}
        alt="Pepina & Pavla u dveří kavárny"
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-end px-8 pb-16 md:px-16 md:pb-24"
      >
        <span className="font-sans-ui text-xs uppercase tracking-[0.4em] text-cream/80">
          Vaše hostitelky
        </span>
        <h2 className="mt-2 text-5xl leading-[0.95] text-cream md:text-7xl">
          Pepina <span className="font-script text-rose">&amp;</span> Pavla
        </h2>
        <p className="mt-4 max-w-md font-display text-lg leading-relaxed text-cream/90 md:text-xl">
          Každý den otevírají dveře s úsměvem a voňavou kávou. Přijďte poznat jejich kouzlo.
        </p>
      </motion.div>
    </section>
  );
}

function MenuBoard({ title, items }: { title: string; items: [string, string | number][] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="chalkboard p-8 md:p-10"
    >
      <h3 className="text-center font-script text-5xl text-chalk">{title}</h3>
      <div className="mx-auto mt-6 h-px w-24 bg-chalk/40" />
      <ul className="mt-6 space-y-3">
        {items.map(([name, price]) => (
          <li key={name} className="flex items-baseline gap-3 font-display text-lg text-chalk">
            <span className="whitespace-nowrap">{name}</span>
            <span className="flex-1 translate-y-[-4px] border-b border-dashed border-chalk/30" />
            <span className="tabular-nums">{price},-</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Menu() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  return (
    <section ref={ref} id="menu" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div style={{ y }} className="text-center">
          <span className="font-sans-ui text-xs uppercase tracking-[0.4em] text-moss">Menu</span>
          <h2 className="mt-3 text-5xl md:text-6xl">Z naší <em className="text-rose">tabule</em></h2>
        </motion.div>
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          <MenuBoard title="Káva" items={coffee as [string, number][]} />
          <MenuBoard title="Dezerty" items={desserts as [string, number][]} />
          <MenuBoard title="Nápoje" items={drinks as [string, string | number][]} />
        </div>
        <p className="mt-8 text-center font-script text-2xl text-rose">objednávky uvnitř · order at bar</p>
      </div>
    </section>
  );
}

function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollWidth = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: () => -getScrollWidth(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollWidth()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const items = [
    { src: glassware.url, alt: "Staré sklo a cukřenka" },
    { src: img2345.url, alt: "Zahrádka kavárny" },
    { src: img2349.url, alt: "Interiér kavárny" },
    { src: img2350.url, alt: "Květiny" },
    { src: img2342.url, alt: "Tabule s kávou" },
    { src: img2343.url, alt: "Tabule s dezerty" },
    { src: img2348.url, alt: "Karlštejn ulice" },
    { src: img2351.url, alt: "Květinový věnec" },
  ];

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 pt-10 text-center md:pt-14">
        <span className="font-sans-ui text-xs uppercase tracking-[0.4em] text-moss">Atmosféra</span>
        <h2 className="mt-3 text-5xl md:text-6xl">U <em className="text-rose">nás</em></h2>
        <p className="mt-3 font-sans-ui text-xs uppercase tracking-[0.3em] text-muted-foreground">
          scroll ↓
        </p>
      </div>

      <div ref={trackRef} className="flex h-full items-center gap-6 px-[8vw] pt-20 md:gap-8 md:px-[10vw]">
        {items.map((it, i) => (
          <figure
            key={i}
            className="paper-card group relative shrink-0 overflow-hidden rounded-md p-2"
            style={{
              width: "clamp(260px, 35vw, 420px)",
              height: "clamp(300px, 55vh, 480px)",
              transform: `rotate(${i % 2 === 0 ? -1.2 : 1.2}deg)`,
            }}
          >
            <img
              src={it.src}
              alt={it.alt}
              loading="lazy"
              className="h-full w-full rounded-sm object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute bottom-3 left-0 right-0 text-center font-script text-lg text-rose drop-shadow md:text-xl">
              {it.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-cream/60 py-12">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-script text-4xl text-rose">Pe &amp; Pa</p>
        <p className="mt-2 font-display text-lg text-muted-foreground">
          Karlštejn 16 · pod hradem · Česká republika
        </p>
        <p className="mt-1 font-sans-ui text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Sobota – Neděle 9:30 – 18:00 · order at bar · objednávky uvnitř
        </p>

        <div className="mx-auto mt-8 h-px w-24 bg-border" />

        <p className="mt-6 font-sans-ui text-xs leading-relaxed text-muted-foreground">
          Provozovatel: Květinová Kavárna Pe&amp;Pa, Karlštejn č.p. 16,
          IČ: 24648744, zapsán v živnostenském rejstříku.
        </p>
        <Link
          to="/ochrana-osobnich-udaju"
          className="mt-3 inline-block font-sans-ui text-xs uppercase tracking-[0.3em] text-moss hover:text-rose"
        >
          Ochrana osobních údajů
        </Link>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-[80] h-[2px] origin-left bg-rose" />;
}

function Index() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    const id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  return (
    <main className="relative overflow-x-clip">
      <Toaster position="top-center" richColors />
      <ScrollProgress />
      <Petals />
      <Hero />
      <Story />
      <OpeningHours />
      <OwnersHero />
      <Menu />
      <Gallery />
      <Footer />
    </main>
  );
}
