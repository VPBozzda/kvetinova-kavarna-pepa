import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from "lenis";

import { useSiteContent, type MenuItem } from "@/lib/siteContent";
import { EditOverlay } from "@/components/EditOverlay";
import { CookieBanner } from "@/components/CookieBanner";
import { Link } from "@tanstack/react-router";

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


function Hero() {
  const c = useSiteContent().hero;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden">
      <motion.div style={{ y: yBack, scale }} className="absolute inset-0">
        <img
          data-edit-image="hero.bgImage"
          data-edit-label="Hero pozadí"
          src={c.bgImage}
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
        <span
          data-edit-text="hero.kicker"
          data-edit-label="Adresa / kicker"
          className="block font-sans-ui text-[13px] uppercase tracking-[0.45em] text-cream/85 md:text-base"
        >
          {c.kicker}
        </span>
        <p className="mt-4 leading-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]">
          <span className="block italic text-cream text-3xl md:text-5xl">Květinová</span>
          <span className="font-script -mt-1 block text-rose text-5xl md:text-7xl">Kavárna</span>
          <span className="mt-2 block text-[11px] tracking-[0.45em] text-cream/80 md:text-sm">PE &amp; PA</span>
        </p>

        <p
          data-edit-text="hero.quote"
          data-edit-label="Hlavní text"
          data-edit-multiline
          className="mt-10 max-w-xl font-display text-lg leading-relaxed text-cream/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] md:text-2xl"
        >
          {c.quote}
        </p>

        <p className="mt-16 max-w-md rounded-md border border-cream/25 bg-ink/40 px-6 py-4 backdrop-blur-sm font-sans-ui text-sm font-medium text-cream/95 shadow-[0_4px_20px_rgba(0,0,0,0.25)] md:mt-20 md:text-base">
          Všechny naše dobroty vám rádi zabalíme i s sebou na hrad.
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
  const s = useSiteContent().story;
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
            data-edit-image="story.image1" data-edit-label="Story obrázek 1"
            src={s.image1}
            alt="Interiér kavárny"
            style={{ y: y1, rotate: rot }}
            className="paper-card absolute left-0 top-0 h-[72%] w-[78%] rounded-md object-cover p-2"
          />
          <motion.img
            data-edit-image="story.image2" data-edit-label="Story obrázek 2"
            src={s.image2}
            alt="Květiny na stole"
            style={{ y: y2 }}
            className="paper-card absolute bottom-0 right-0 h-[58%] w-[62%] rounded-md object-cover p-2"
          />
        </div>
        <div>
          <span className="font-sans-ui text-xs uppercase tracking-[0.4em] text-moss">Naše story</span>
          <h2 data-edit-text="story.title" data-edit-label="Story nadpis" className="mt-3 text-5xl md:text-6xl">{s.title}</h2>
          <p data-edit-text="story.body" data-edit-label="Story text" data-edit-multiline className="mt-6 font-display text-xl leading-relaxed text-muted-foreground whitespace-pre-line">{s.body}</p>
          <p data-edit-text="story.signoff" data-edit-label="Podpis story" className="mt-4 font-script text-3xl text-rose">{s.signoff}</p>
        </div>
      </div>
    </section>
  );
}

function Founders() {
  const f = useSiteContent().founders;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 0.98]);
  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="font-sans-ui text-xs uppercase tracking-[0.4em] text-moss">Zakladatelky</span>
          <h2 className="mt-3 text-5xl md:text-6xl">Pe <em className="text-rose">&amp;</em> Pa</h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="paper-card relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-md p-3"
        >
          <motion.img
            data-edit-image="founders.image" data-edit-label="Zakladatelky foto"
            style={{ y, scale }}
            src={f.image}
            alt={f.caption}
            className="h-[60vh] w-full rounded-sm object-cover"
          />
          <p data-edit-text="founders.caption" data-edit-label="Popisek zakladatelek" className="mt-4 text-center font-script text-3xl text-rose">{f.caption}</p>
        </motion.div>
      </div>
    </section>
  );
}

function MenuBoard({ title, items, listPath }: { title: string; items: MenuItem[]; listPath: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="chalkboard p-8 md:p-10"
      data-edit-list={listPath}
      data-edit-label={`Menu · ${title}`}
    >
      <h3 className="text-center font-script text-5xl text-chalk">{title}</h3>
      <div className="mx-auto mt-6 h-px w-24 bg-chalk/40" />
      <ul className="mt-6 space-y-3">
        {items.map((it, i) => (
          <li key={i} className="flex items-baseline gap-3 font-display text-lg text-chalk">
            <span className="whitespace-nowrap">{it.name}</span>
            <span className="flex-1 translate-y-[-4px] border-b border-dashed border-chalk/30" />
            <span className="tabular-nums">{it.price},-</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Menu() {
  const m = useSiteContent().menu;
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
          <MenuBoard title="Káva" items={m.coffee} listPath="menu.coffee" />
          <MenuBoard title="Dezerty" items={m.desserts} listPath="menu.desserts" />
          <MenuBoard title="Nápoje" items={m.drinks} listPath="menu.drinks" />
        </div>
        <p className="mt-8 text-center font-script text-2xl text-rose">objednávky uvnitř · order at bar</p>
      </div>
    </section>
  );
}

function Gallery() {
  const g = useSiteContent().gallery;
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [maxX, setMaxX] = useState(0);

  useEffect(() => {
    const calc = () => {
      const track = trackRef.current;
      if (!track) return;
      setMaxX(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [g.length]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);

  return (
    <section ref={ref} className="relative" style={{ height: `${100 + (typeof window !== "undefined" && window.innerWidth ? (maxX / window.innerWidth) * 100 : 0)}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="px-6 text-center">
          <span className="font-sans-ui text-xs uppercase tracking-[0.4em] text-moss">Atmosféra</span>
          <h2 className="mt-3 text-5xl md:text-6xl">U <em className="text-rose">nás</em></h2>
        </div>
        <motion.div ref={trackRef} style={{ x }} className="mt-10 flex gap-6 px-[10vw] will-change-transform">
          {g.map((src, i) => (
            <div
              key={i}
              className="paper-card shrink-0 overflow-hidden rounded-md p-2"
              style={{ width: "min(70vw, 520px)" }}
            >
              <img
                data-edit-image={`gallery.${i}`} data-edit-label={`Galerie ${i + 1}`}
                src={src}
                alt={`Atmosféra ${i + 1}`}
                className="h-[60vh] w-full rounded-sm object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


function Footer() {
  const f = useSiteContent().footer;
  return (
    <footer className="border-t border-border bg-cream/60 py-12">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="font-script text-4xl text-rose">Pe &amp; Pa</p>
        <p data-edit-text="footer.address" data-edit-label="Adresa" className="mt-2 font-display text-lg text-muted-foreground">{f.address}</p>
        <p data-edit-text="footer.tagline" data-edit-label="Tagline" className="mt-1 font-sans-ui text-xs uppercase tracking-[0.3em] text-muted-foreground">{f.tagline}</p>
        <div className="mx-auto mt-6 h-px w-16 bg-border" />
        <p className="mt-4 font-sans-ui text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          IČ: 24648744 · zapsán v živnostenském rejstříku
        </p>
        <p className="mt-2 font-sans-ui text-[11px] tracking-wide">
          <Link to="/ochrana-osobnich-udaju" className="text-muted-foreground underline decoration-rose/60 underline-offset-4 hover:text-rose">
            Ochrana osobních údajů
          </Link>
        </p>
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
  const editMode = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("edit") === "1";

  useEffect(() => {
    if (editMode) return; // disable Lenis in editor for predictable clicks
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    const id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, [editMode]);

  return (
    <main className="relative overflow-x-clip">
      <ScrollProgress />
      
      <Hero />
      <Story />
      <Founders />
      <Menu />
      <Gallery />
      <Footer />
      {!editMode && <CookieBanner />}
      {editMode && <EditOverlay />}
    </main>
  );
}
