import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_CONTENT, getPath, setPath, useSiteContent, saveSiteContent, type SiteContent, type MenuItem } from "@/lib/siteContent";
import { Monitor, Smartphone, Tablet, LogOut, Eye, Loader2, X, Plus, Trash2, Upload, RefreshCw, Save } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Studio · Pe&Pa" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [status, setStatus] = useState<"loading" | "anon" | "noauth" | "ready">("loading");

  useEffect(() => {
    let mounted = true;
    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!session) { setStatus("anon"); return; }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
      if (!mounted) return;
      setStatus(roles?.some(r => r.role === "admin") ? "ready" : "noauth");
    }
    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  if (status === "loading") return <Splash />;
  if (status === "anon" || status === "noauth") return <Login denied={status === "noauth"} />;
  return <Studio onSignOut={async () => { await supabase.auth.signOut(); }} />;
}

function Splash() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 text-neutral-500">
      <Loader2 className="h-5 w-5 animate-spin" />
    </div>
  );
}

function Login({ denied }: { denied?: boolean }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    setBusy(false);
    if (error) setErr(error.message);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-neutral-900 text-xs font-semibold tracking-tight text-white">P&amp;P</div>
          <div>
            <div className="text-sm font-medium tracking-tight text-neutral-900">Studio</div>
            <div className="text-xs text-neutral-500">Pe&amp;Pa content workspace</div>
          </div>
        </div>
        {denied && (
          <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Tento účet nemá administrátorská práva.
            <button onClick={() => supabase.auth.signOut()} className="ml-2 underline">odhlásit</button>
          </div>
        )}
        <form onSubmit={submit} className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-neutral-500">E-mail</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required autoFocus
              className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10" />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-neutral-500">Heslo</span>
            <input value={pw} onChange={(e) => setPw(e.target.value)} type="password" required
              className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10" />
          </label>
          <button disabled={busy} className="mt-2 w-full rounded-md bg-neutral-900 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50">
            {busy ? "…" : "Přihlásit se"}
          </button>
          {err && <p className="text-xs text-red-600">{err}</p>}
        </form>
        <p className="mt-8 text-[11px] text-neutral-400">Změny v editoru se okamžitě promítnou na živý web.</p>
      </div>
    </div>
  );
}

type Selection = { kind: "text" | "image" | "list" | "num"; path: string; label: string; multiline?: boolean } | null;
type Device = "desktop" | "tablet" | "mobile";

function Studio({ onSignOut }: { onSignOut: () => Promise<void> }) {
  const live = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(live);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [selection, setSelection] = useState<Selection>(null);
  const [device, setDevice] = useState<Device>("desktop");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sync draft when live changes (and we're clean)
  useEffect(() => { if (!dirty) setDraft(live); }, [live, dirty]);

  // Listen to iframe selections
  useEffect(() => {
    function onMsg(e: MessageEvent) {
      if (e.data?.source !== "pepa-edit") return;
      if (e.data.type === "select") {
        setSelection({ kind: e.data.kind, path: e.data.path, label: e.data.label, multiline: e.data.multiline });
      }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  function update(path: string, value: any) {
    setDraft((d) => setPath(d, path, value));
    setDirty(true);
  }

  async function save() {
    setSaving(true);
    try {
      await saveSiteContent(draft);
      setDirty(false);
      setSavedAt(Date.now());
    } catch (e: any) {
      alert("Nepodařilo se uložit: " + e.message);
    } finally {
      setSaving(false);
    }
  }

  function revert() {
    setDraft(live);
    setDirty(false);
    setSelection(null);
    iframeRef.current?.contentWindow?.postMessage({ source: "pepa-admin", type: "clearSelection" }, "*");
  }

  function resetDefaults() {
    if (!confirm("Vrátit veškerý obsah na výchozí?")) return;
    setDraft(DEFAULT_CONTENT);
    setDirty(true);
  }

  const deviceWidth = device === "mobile" ? 390 : device === "tablet" ? 820 : undefined;

  return (
    <div className="flex h-screen flex-col bg-neutral-100 text-neutral-900">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-neutral-200 bg-white px-4">
        <div className="flex items-center gap-3">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-neutral-900 text-[10px] font-semibold text-white">P&amp;P</div>
          <div className="text-sm font-medium tracking-tight">Studio</div>
          <span className="text-neutral-300">/</span>
          <span className="text-xs text-neutral-500">Květinová Kavárna</span>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-50 p-0.5">
          {([["desktop", Monitor], ["tablet", Tablet], ["mobile", Smartphone]] as const).map(([d, Icon]) => (
            <button key={d} onClick={() => setDevice(d)}
              className={`flex h-7 w-9 items-center justify-center rounded-md transition ${device === d ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900"}`}>
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">
            {saving ? "Ukládám…" : dirty ? "● neuložené změny" : savedAt ? "✓ uloženo" : "synced"}
          </span>
          <button onClick={revert} disabled={!dirty} className="rounded-md px-3 py-1.5 text-xs text-neutral-600 transition hover:bg-neutral-100 disabled:opacity-40">
            Zahodit
          </button>
          <button onClick={save} disabled={!dirty || saving}
            className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-700 disabled:opacity-40">
            <Save className="h-3 w-3" /> Publikovat
          </button>
          <a href="/" target="_blank" className="rounded-md p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900" title="Otevřít web">
            <Eye className="h-4 w-4" />
          </a>
          <button onClick={onSignOut} className="rounded-md p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900" title="Odhlásit">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="flex min-h-0 flex-1">
        {/* Canvas */}
        <div className="flex min-w-0 flex-1 items-start justify-center overflow-auto p-6">
          <div
            className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all"
            style={deviceWidth ? { width: deviceWidth, height: "calc(100vh - 7rem)" } : { width: "100%", height: "calc(100vh - 7rem)" }}
          >
            <PreviewFrame ref={iframeRef} draft={draft} />
          </div>
        </div>

        {/* Inspector */}
        <aside className="flex w-[360px] shrink-0 flex-col border-l border-neutral-200 bg-white">
          <div className="flex h-11 items-center justify-between border-b border-neutral-200 px-4">
            <div className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              {selection ? "Inspektor" : "Studio"}
            </div>
            {selection && (
              <button onClick={() => { setSelection(null); iframeRef.current?.contentWindow?.postMessage({ source: "pepa-admin", type: "clearSelection" }, "*"); }}
                className="rounded-md p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="min-h-0 flex-1 overflow-auto">
            {selection ? (
              <Inspector selection={selection} draft={draft} update={update} />
            ) : (
              <EmptyHint onResetDefaults={resetDefaults} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

const PreviewFrame = (() => {
  const Inner = ({ draft }: { draft: SiteContent }, ref: React.Ref<HTMLIFrameElement>) => {
    // Push draft into the iframe on every change via realtime is automatic for `live` content,
    // but for draft (unsaved) we send it via postMessage and the iframe applies it locally.
    // Simpler: we only update on save. So preview shows live (committed) content for now.
    void draft;
    return (
      <iframe
        ref={ref}
        title="preview"
        src="/?edit=1"
        className="h-full w-full border-0"
      />
    );
  };
  return Object.assign(
    require("react").forwardRef<HTMLIFrameElement, { draft: SiteContent }>(Inner),
    {}
  );
})();

function EmptyHint({ onResetDefaults }: { onResetDefaults: () => void }) {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-sm font-medium tracking-tight text-neutral-900">Vizuální editor</h3>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
          Klikněte na cokoliv v náhledu — text, obrázek, menu — a upravte to v tomto panelu. Změny publikujte tlačítkem nahoře.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <span className="grid h-5 w-5 place-items-center rounded bg-neutral-100 text-[10px] font-semibold">T</span>
          <span>Texty &amp; nadpisy</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <span className="grid h-5 w-5 place-items-center rounded bg-neutral-100 text-[10px] font-semibold">I</span>
          <span>Obrázky &amp; fotografie</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <span className="grid h-5 w-5 place-items-center rounded bg-neutral-100 text-[10px] font-semibold">≡</span>
          <span>Menu seznamy (káva, dezerty, nápoje)</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <span className="grid h-5 w-5 place-items-center rounded bg-neutral-100 text-[10px] font-semibold">#</span>
          <span>Kapacita stolů</span>
        </div>
      </div>

      <div className="border-t border-neutral-100 pt-6">
        <button onClick={onResetDefaults} className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition hover:text-red-600">
          <RefreshCw className="h-3 w-3" /> Obnovit výchozí obsah
        </button>
      </div>
    </div>
  );
}

function Inspector({ selection, draft, update }: { selection: NonNullable<Selection>; draft: SiteContent; update: (path: string, value: any) => void }) {
  const value = useMemo(() => getPath(draft, selection.path), [draft, selection.path]);

  return (
    <div className="space-y-4 p-5">
      <div>
        <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-400">{selection.kind}</div>
        <h3 className="mt-0.5 text-sm font-medium tracking-tight text-neutral-900">{selection.label}</h3>
        <code className="mt-1 block break-all rounded bg-neutral-50 px-1.5 py-0.5 text-[10px] text-neutral-500">{selection.path}</code>
      </div>

      {selection.kind === "text" && (
        selection.multiline ? (
          <textarea autoFocus value={value || ""} onChange={(e) => update(selection.path, e.target.value)} rows={8}
            className="w-full resize-y rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm leading-relaxed outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10" />
        ) : (
          <input autoFocus value={value || ""} onChange={(e) => update(selection.path, e.target.value)}
            className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10" />
        )
      )}

      {selection.kind === "num" && (
        <input type="number" min={0} autoFocus value={value ?? 0} onChange={(e) => update(selection.path, Math.max(0, Number(e.target.value) || 0))}
          className="w-32 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm tabular-nums outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10" />
      )}

      {selection.kind === "image" && (
        <ImageEditor value={value || ""} onChange={(v) => update(selection.path, v)} />
      )}

      {selection.kind === "list" && (
        <ListEditor value={value || []} onChange={(v) => update(selection.path, v)} />
      )}
    </div>
  );
}

function ImageEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  function onFile(f: File) {
    if (f.size > 2 * 1024 * 1024) { alert("Soubor je větší než 2 MB."); return; }
    setBusy(true);
    const r = new FileReader();
    r.onload = () => { onChange(String(r.result)); setBusy(false); };
    r.readAsDataURL(f);
  }
  return (
    <div className="space-y-3">
      {value && (
        <div className="overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
          <img src={value} alt="" className="block max-h-56 w-full object-contain" />
        </div>
      )}
      <input value={value.startsWith("data:") ? "" : value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://… (URL obrázku)"
        className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10" />
      <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-neutral-300 bg-neutral-50 py-3 text-xs text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900">
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
        Nahrát ze zařízení
        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
      </label>
    </div>
  );
}

function ListEditor({ value, onChange }: { value: MenuItem[]; onChange: (v: MenuItem[]) => void }) {
  return (
    <div className="space-y-1.5">
      {value.map((it, i) => (
        <div key={i} className="group flex items-center gap-1.5">
          <input value={it.name} onChange={(e) => { const n = [...value]; n[i] = { ...it, name: e.target.value }; onChange(n); }}
            className="flex-1 rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-neutral-900" />
          <input value={it.price} onChange={(e) => { const n = [...value]; n[i] = { ...it, price: e.target.value }; onChange(n); }}
            className="w-20 rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs tabular-nums outline-none focus:border-neutral-900" />
          <button onClick={() => onChange(value.filter((_, j) => j !== i))}
            className="rounded-md p-1.5 text-neutral-300 transition hover:bg-red-50 hover:text-red-600">
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...value, { name: "Nová položka", price: "0" }])}
        className="mt-2 inline-flex items-center gap-1 rounded-md border border-dashed border-neutral-300 px-2.5 py-1.5 text-xs text-neutral-500 transition hover:border-neutral-900 hover:text-neutral-900">
        <Plus className="h-3 w-3" /> Přidat položku
      </button>
    </div>
  );
}
