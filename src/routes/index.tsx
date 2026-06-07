import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from "lenis";
import { toast, Toaster } from "sonner";

import img2342 from "@/assets/IMG_2342.asset.json";
import img2343 from "@/assets/IMG_2343.asset.json";
import img2344 from "@/assets/IMG_2344.asset.json";
import img2345 from "@/assets/IMG_2345.asset.json";
import img2348 from "@/assets/IMG_2348.asset.json";
import img2349 from "@/assets/IMG_2349.asset.json";
import img2350 from "@/assets/IMG_2350.asset.json";
import img2351 from "@/assets/IMG_2351.asset.json";

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
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden">
      {/* single background image */}
      <motion.div style={{ y: yBack, scale }} className="absolute inset-0">
        <img
          src={img2348.url}
          alt="Pohled na Karlštejn"
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.62) saturate(0.85) contrast(1.05) sepia(0.18)" }}
        />
        {/* readability overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.2_0.02_30/0.15)_0%,_oklch(0.15_0.02_30/0.55)_85%)]" />
      </motion.div>

      {/* foreground text */}
      <motion.div
        style={{ y: yFront, opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <span className="font-sans-ui text-xs uppercase tracking-[0.4em] text-cream/90">
          Karlštejn · č.p. 16
        </span>
        <h1 className="mt-4 text-[clamp(3rem,11vw,8rem)] leading-[0.9] drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]">
          <span className="block italic text-cream">Květinová</span>
          <span className="font-script -mt-2 block text-[clamp(4rem,14vw,10rem)] text-rose">
            Kavárna
          </span>
          <span className="mt-2 block text-2xl tracking-[0.5em] text-cream/95 md:text-3xl">
            PE &amp; PA
          </span>
        </h1>
        <p className="mt-6 max-w-xl font-display text-xl italic text-cream/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-2xl">
          „Děláme to celé od srdce — protože to říkáme.“
        </p>
        <p className="mt-2 max-w-md font-sans-ui text-xs uppercase tracking-[0.35em] text-cream/80">
          Pepina &amp; Pavla
        </p>
        <a
          href="#rezervace"
          className="mt-8 inline-flex items-center gap-3 rounded-full border border-cream/60 bg-cream/10 px-7 py-3 font-sans-ui text-sm uppercase tracking-[0.3em] text-cream backdrop-blur transition hover:bg-cream hover:text-ink"
        >
          Rezervovat stůl
        </a>
      </motion.div>

      {/* sway branches */}
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
  const items = [
    { src: img2345.url, alt: "Zahrádka", span: "md:col-span-2 md:row-span-2", h: "h-[420px]" },
    { src: img2342.url, alt: "Tabule káva", span: "", h: "h-[260px]" },
    { src: img2343.url, alt: "Tabule dezerty", span: "", h: "h-[260px]" },
    { src: img2349.url, alt: "Interiér", span: "", h: "h-[260px]" },
    { src: img2350.url, alt: "Květiny", span: "", h: "h-[260px]" },
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="font-sans-ui text-xs uppercase tracking-[0.4em] text-moss">Atmosféra</span>
          <h2 className="mt-3 text-5xl md:text-6xl">U <em className="text-rose">nás</em></h2>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[200px]">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`paper-card overflow-hidden rounded-md p-2 ${it.span}`}
            >
              <img
                src={it.src}
                alt={it.alt}
                className={`h-full w-full ${it.h} rounded-sm object-cover transition-transform duration-700 hover:scale-105`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reservation() {
  const OUT_MAX = 32, IN_MAX = 10;
  const [seating, setSeating] = useState<"venku" | "vevnitr">("venku");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const cap = seating === "venku" ? OUT_MAX : IN_MAX;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !date || !time) {
      toast.error("Vyplňte prosím všechna pole.");
      return;
    }
    if (guests > cap) {
      toast.error(`Maximum pro ${seating} je ${cap} hostů.`);
      return;
    }
    toast.success(`Děkujeme, ${name}! Rezervace pro ${guests} ${seating === "venku" ? "venku" : "vevnitř"} přijata.`, {
      description: `${date} v ${time} · ozveme se na ${phone}.`,
    });
    setName(""); setPhone(""); setDate(""); setTime(""); setGuests(2);
  }

  return (
    <section id="rezervace" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="font-sans-ui text-xs uppercase tracking-[0.4em] text-moss">Rezervace</span>
          <h2 className="mt-3 text-5xl md:text-6xl">Přijďte <em className="text-rose">posedět</em></h2>
          <p className="mt-4 font-display text-lg text-muted-foreground">
            Venku až <strong className="text-primary">32</strong> míst, uvnitř pro intimní chvíle <strong className="text-primary">10</strong> míst.
          </p>
        </div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="paper-card mt-12 rounded-lg p-8 md:p-12"
        >
          <div className="grid grid-cols-2 gap-3">
            {(["venku", "vevnitr"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSeating(s)}
                className={`rounded-md border px-4 py-4 text-center font-display text-lg transition ${
                  seating === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-cream/50 text-foreground hover:border-primary/50"
                }`}
              >
                {s === "venku" ? "Zahrádka · max 32" : "Uvnitř · max 10"}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Jméno"><input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Pepina N." /></Field>
            <Field label="Telefon"><input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} placeholder="+420 ..." /></Field>
            <Field label="Datum"><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} /></Field>
            <Field label="Čas"><input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} /></Field>
            <Field label={`Hosté (max ${cap})`}>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="h-10 w-10 rounded-md border border-border bg-cream text-xl">−</button>
                <input
                  type="number" min={1} max={cap} value={guests}
                  onChange={(e) => setGuests(Math.min(cap, Math.max(1, Number(e.target.value) || 1)))}
                  className={`${inputCls} text-center`}
                />
                <button type="button" onClick={() => setGuests(Math.min(cap, guests + 1))} className="h-10 w-10 rounded-md border border-border bg-cream text-xl">+</button>
              </div>
            </Field>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-md bg-primary py-4 font-sans-ui text-sm uppercase tracking-[0.3em] text-primary-foreground transition hover:bg-accent"
          >
            Rezervovat
          </button>
        </motion.form>
      </div>
    </section>
  );
}

const inputCls = "w-full rounded-md border border-border bg-cream/70 px-4 py-3 font-display text-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-sans-ui text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-cream/60 py-12">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="font-script text-4xl text-rose">Pe &amp; Pa</p>
        <p className="mt-2 font-display text-lg text-muted-foreground">Karlštejn 16 · pod hradem · Česká republika</p>
        <p className="mt-1 font-sans-ui text-xs uppercase tracking-[0.3em] text-muted-foreground">otevřeno denně · order at bar · objednávky uvnitř</p>
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
      <Menu />
      <Gallery />
      <Reservation />
      <Footer />
    </main>
  );
}
