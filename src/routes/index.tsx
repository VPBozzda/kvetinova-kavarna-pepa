import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from "lenis";
import { toast, Toaster } from "sonner";

import { useSiteContent, type MenuItem } from "@/lib/siteContent";
import { EditOverlay } from "@/components/EditOverlay";

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
        className="relative z-10 flex h-full flex-col px-6"
      >
        <div className="pt-8 md:pt-10">
          <h1 className="text-left leading-[0.95] drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]">
            <span className="block italic text-cream text-2xl md:text-3xl">Květinová</span>
            <span className="font-script -mt-1 block text-rose text-3xl md:text-4xl">Kavárna</span>
            <span className="mt-1 block text-[10px] tracking-[0.45em] text-cream/90 md:text-xs">PE &amp; PA</span>
          </h1>
          <span data-edit-text="hero.kicker" data-edit-label="Kicker" className="mt-2 block font-sans-ui text-[10px] uppercase tracking-[0.4em] text-cream/80">{c.kicker}</span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p data-edit-text="hero.quote" data-edit-label="Hero text" data-edit-multiline className="max-w-xl font-display text-xl italic text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] md:text-2xl">
            {c.quote}
          </p>
          <a
            href="#rezervace"
            data-edit-text="hero.cta" data-edit-label="CTA tlačítko"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3 font-sans-ui text-sm uppercase tracking-[0.3em] text-primary-foreground shadow-lg shadow-ink/30 transition hover:bg-accent"
          >
            {c.cta}
          </a>
        </div>
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
  const layout = ["md:col-span-2 md:row-span-2", "", "", "", ""];
  const h = ["h-[420px]", "h-[260px]", "h-[260px]", "h-[260px]", "h-[260px]"];
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="font-sans-ui text-xs uppercase tracking-[0.4em] text-moss">Atmosféra</span>
          <h2 className="mt-3 text-5xl md:text-6xl">U <em className="text-rose">nás</em></h2>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[200px]">
          {g.slice(0, 5).map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`paper-card overflow-hidden rounded-md p-2 ${layout[i] ?? ""}`}
            >
              <img
                data-edit-image={`gallery.${i}`} data-edit-label={`Galerie ${i + 1}`}
                src={src}
                alt={`Atmosféra ${i + 1}`}
                className={`h-full w-full ${h[i] ?? "h-[260px]"} rounded-sm object-cover transition-transform duration-700 hover:scale-105`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reservation() {
  const r = useSiteContent().reservation;
  const OUT_MAX = r.outMax, IN_MAX = r.inMax;
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
          <p data-edit-text="reservation.note" data-edit-label="Rezervace poznámka" data-edit-multiline className="mt-4 font-display text-lg text-muted-foreground">{r.note}</p>
          <div className="mt-3 flex justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span data-edit-num="reservation.outMax" data-edit-label="Max venku" className="cursor-default">venku max {OUT_MAX}</span>
            <span>·</span>
            <span data-edit-num="reservation.inMax" data-edit-label="Max vevnitř" className="cursor-default">vevnitř max {IN_MAX}</span>
          </div>
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
                {s === "venku" ? `Zahrádka · max ${OUT_MAX}` : `Uvnitř · max ${IN_MAX}`}
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
  const f = useSiteContent().footer;
  return (
    <footer className="border-t border-border bg-cream/60 py-12">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="font-script text-4xl text-rose">Pe &amp; Pa</p>
        <p data-edit-text="footer.address" data-edit-label="Adresa" className="mt-2 font-display text-lg text-muted-foreground">{f.address}</p>
        <p data-edit-text="footer.tagline" data-edit-label="Tagline" className="mt-1 font-sans-ui text-xs uppercase tracking-[0.3em] text-muted-foreground">{f.tagline}</p>
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
      <Toaster position="top-center" richColors />
      <ScrollProgress />
      <Petals />
      <Hero />
      <Story />
      <Founders />
      <Menu />
      <Gallery />
      <Reservation />
      <Footer />
      {editMode && <EditOverlay />}
    </main>
  );
}
