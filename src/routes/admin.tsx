import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_CONTENT, getSiteContent, resetContent, saveContent, type SiteContent, type MenuItem } from "@/lib/siteContent";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "admin :: pepa" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminPage,
});

const PASSWORD = "bloom-K9x7-pepa-r4nd0m";
const AUTH_KEY = "pepa-admin-auth-v1";

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => { setAuthed(sessionStorage.getItem(AUTH_KEY) === "ok"); }, []);
  if (!authed) return <Login onOk={() => setAuthed(true)} />;
  return <Editor onLogout={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }} />;
}

function Login({ onOk }: { onOk: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="min-h-screen bg-black font-mono text-emerald-300 antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
        <pre className="text-xs leading-tight text-emerald-500/70">{`
  ┌─ pepa.admin ──────────────────┐
  │  authorization required        │
  └────────────────────────────────┘`}</pre>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pw === PASSWORD) { sessionStorage.setItem(AUTH_KEY, "ok"); onOk(); }
            else setErr("× access denied");
          }}
          className="mt-8 space-y-3"
        >
          <label className="block text-[11px] uppercase tracking-[0.3em] text-emerald-500/60">passphrase</label>
          <input
            autoFocus
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(""); }}
            className="w-full border border-emerald-700/40 bg-black px-3 py-2 font-mono text-emerald-200 outline-none focus:border-emerald-400"
            placeholder="••••••••"
          />
          <button className="w-full border border-emerald-500/60 bg-emerald-500/10 py-2 text-sm uppercase tracking-[0.3em] text-emerald-200 transition hover:bg-emerald-500/20">
            $ authenticate
          </button>
          {err && <p className="text-xs text-red-400">{err}</p>}
        </form>
        <p className="mt-6 text-[10px] text-emerald-700">session-bound · local edits only</p>
      </div>
    </div>
  );
}

function Editor({ onLogout }: { onLogout: () => void }) {
  const [c, setC] = useState<SiteContent>(() => getSiteContent());
  const [saved, setSaved] = useState<"idle" | "ok" | "err">("idle");

  function persist(next: SiteContent) {
    setC(next);
    try { saveContent(next); setSaved("ok"); setTimeout(() => setSaved("idle"), 1200); }
    catch { setSaved("err"); }
  }
  function patch<K extends keyof SiteContent>(k: K, v: Partial<SiteContent[K]>) {
    persist({ ...c, [k]: { ...(c[k] as object), ...v } as SiteContent[K] });
  }

  const size = useMemo(() => new Blob([JSON.stringify(c)]).size, [c]);

  return (
    <div className="min-h-screen bg-black font-mono text-emerald-100 antialiased">
      <header className="sticky top-0 z-10 border-b border-emerald-900/60 bg-black/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400">●</span>
            <span className="uppercase tracking-[0.3em] text-emerald-300">pepa.admin</span>
            <span className="text-emerald-700">/</span>
            <span className="text-emerald-600">content editor</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-600">
            <span>{(size / 1024).toFixed(1)} KB</span>
            <span>{saved === "ok" ? "✓ saved" : saved === "err" ? "× error" : "idle"}</span>
            <a href="/" target="_blank" className="text-emerald-300 hover:underline">view →</a>
            <button onClick={onLogout} className="text-emerald-300 hover:underline">logout</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-10 px-6 py-10">
        <Section title="hero">
          <ImgField label="bg image" value={c.hero.bgImage} onChange={(v) => patch("hero", { bgImage: v })} />
          <TextField label="kicker" value={c.hero.kicker} onChange={(v) => patch("hero", { kicker: v })} />
          <TextField label="quote" value={c.hero.quote} onChange={(v) => patch("hero", { quote: v })} multiline />
          <TextField label="signature" value={c.hero.signature} onChange={(v) => patch("hero", { signature: v })} />
          <TextField label="cta button" value={c.hero.cta} onChange={(v) => patch("hero", { cta: v })} />
        </Section>

        <Section title="story">
          <TextField label="title" value={c.story.title} onChange={(v) => patch("story", { title: v })} />
          <TextField label="body" value={c.story.body} onChange={(v) => patch("story", { body: v })} multiline />
          <TextField label="signoff" value={c.story.signoff} onChange={(v) => patch("story", { signoff: v })} />
          <ImgField label="image 1" value={c.story.image1} onChange={(v) => patch("story", { image1: v })} />
          <ImgField label="image 2" value={c.story.image2} onChange={(v) => patch("story", { image2: v })} />
        </Section>

        <Section title="founders">
          <ImgField label="photo" value={c.founders.image} onChange={(v) => patch("founders", { image: v })} />
          <TextField label="caption" value={c.founders.caption} onChange={(v) => patch("founders", { caption: v })} />
        </Section>

        <Section title="menu.coffee">
          <MenuEditor items={c.menu.coffee} onChange={(items) => persist({ ...c, menu: { ...c.menu, coffee: items } })} />
        </Section>
        <Section title="menu.desserts">
          <MenuEditor items={c.menu.desserts} onChange={(items) => persist({ ...c, menu: { ...c.menu, desserts: items } })} />
        </Section>
        <Section title="menu.drinks">
          <MenuEditor items={c.menu.drinks} onChange={(items) => persist({ ...c, menu: { ...c.menu, drinks: items } })} />
        </Section>

        <Section title="gallery">
          <div className="space-y-2">
            {c.gallery.map((g, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-6 text-xs text-emerald-700">[{i}]</span>
                <ImgField inline value={g} onChange={(v) => {
                  const next = [...c.gallery]; next[i] = v; persist({ ...c, gallery: next });
                }} />
                <button
                  onClick={() => persist({ ...c, gallery: c.gallery.filter((_, j) => j !== i) })}
                  className="border border-red-900/60 px-2 py-1 text-xs text-red-300 hover:bg-red-950/40"
                >rm</button>
              </div>
            ))}
            <button
              onClick={() => persist({ ...c, gallery: [...c.gallery, ""] })}
              className="mt-2 border border-emerald-700/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-300 hover:bg-emerald-950/40"
            >+ add slot</button>
          </div>
        </Section>

        <Section title="reservation">
          <NumField label="outdoor max" value={c.reservation.outMax} onChange={(v) => patch("reservation", { outMax: v })} />
          <NumField label="indoor max" value={c.reservation.inMax} onChange={(v) => patch("reservation", { inMax: v })} />
          <TextField label="note" value={c.reservation.note} onChange={(v) => patch("reservation", { note: v })} multiline />
        </Section>

        <Section title="footer">
          <TextField label="address" value={c.footer.address} onChange={(v) => patch("footer", { address: v })} />
          <TextField label="tagline" value={c.footer.tagline} onChange={(v) => patch("footer", { tagline: v })} />
        </Section>

        <Section title="danger">
          <button
            onClick={() => { if (confirm("Reset to defaults?")) { resetContent(); setC(DEFAULT_CONTENT); } }}
            className="border border-red-700/60 bg-red-950/30 px-4 py-2 text-xs uppercase tracking-[0.3em] text-red-300 hover:bg-red-950/60"
          >$ reset --hard</button>
        </Section>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-emerald-900/60">
      <header className="border-b border-emerald-900/60 bg-emerald-950/30 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-400">
        ▸ {title}
      </header>
      <div className="space-y-4 p-4">{children}</div>
    </section>
  );
}

function TextField({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] uppercase tracking-[0.3em] text-emerald-600">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full border border-emerald-900/60 bg-black px-3 py-2 text-sm text-emerald-100 outline-none focus:border-emerald-400"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-emerald-900/60 bg-black px-3 py-2 text-sm text-emerald-100 outline-none focus:border-emerald-400"
        />
      )}
    </label>
  );
}

function NumField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] uppercase tracking-[0.3em] text-emerald-600">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        className="w-32 border border-emerald-900/60 bg-black px-3 py-2 text-sm text-emerald-100 outline-none focus:border-emerald-400"
      />
    </label>
  );
}

function ImgField({ label, value, onChange, inline }: { label?: string; value: string; onChange: (v: string) => void; inline?: boolean }) {
  function onFile(f: File) {
    if (f.size > 1.5 * 1024 * 1024) {
      if (!confirm(`Image is ${(f.size / 1024 / 1024).toFixed(1)} MB. Storage may overflow. Continue?`)) return;
    }
    const r = new FileReader();
    r.onload = () => onChange(String(r.result));
    r.readAsDataURL(f);
  }
  return (
    <div className={inline ? "flex flex-1 items-center gap-2" : "block"}>
      {label && <span className="mb-1 block text-[10px] uppercase tracking-[0.3em] text-emerald-600">{label}</span>}
      <div className="flex items-center gap-2">
        {value && <img src={value} alt="" className="h-12 w-12 border border-emerald-900/60 object-cover" />}
        <input
          value={value.startsWith("data:") ? "[data-url embedded]" : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or upload"
          className="flex-1 border border-emerald-900/60 bg-black px-3 py-2 text-xs text-emerald-100 outline-none focus:border-emerald-400"
        />
        <label className="cursor-pointer border border-emerald-700/60 px-3 py-2 text-xs uppercase tracking-[0.3em] text-emerald-300 hover:bg-emerald-950/40">
          upload
          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        </label>
      </div>
    </div>
  );
}

function MenuEditor({ items, onChange }: { items: MenuItem[]; onChange: (items: MenuItem[]) => void }) {
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-6 text-xs text-emerald-700">[{i}]</span>
          <input
            value={it.name}
            onChange={(e) => { const n = [...items]; n[i] = { ...it, name: e.target.value }; onChange(n); }}
            className="flex-1 border border-emerald-900/60 bg-black px-3 py-2 text-sm text-emerald-100 outline-none focus:border-emerald-400"
          />
          <input
            value={it.price}
            onChange={(e) => { const n = [...items]; n[i] = { ...it, price: e.target.value }; onChange(n); }}
            className="w-24 border border-emerald-900/60 bg-black px-3 py-2 text-sm text-emerald-100 outline-none focus:border-emerald-400"
          />
          <button
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="border border-red-900/60 px-2 py-1 text-xs text-red-300 hover:bg-red-950/40"
          >rm</button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, { name: "Nová položka", price: "0" }])}
        className="mt-2 border border-emerald-700/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-300 hover:bg-emerald-950/40"
      >+ add row</button>
    </div>
  );
}
