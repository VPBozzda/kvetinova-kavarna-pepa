import { useSyncExternalStore } from "react";

import img2342 from "@/assets/IMG_2342.asset.json";
import img2343 from "@/assets/IMG_2343.asset.json";
import img2345 from "@/assets/IMG_2345.asset.json";
import img2349 from "@/assets/IMG_2349.asset.json";
import img2350 from "@/assets/IMG_2350.asset.json";
import karlstejnStreet from "@/assets/karlstejn-street.jpeg.asset.json";
import founders from "@/assets/pepa-pavla-dvere.jpg.asset.json";

export type MenuItem = { name: string; price: string };

export type SiteContent = {
  hero: { kicker: string; quote: string; signature: string; cta: string; bgImage: string };
  story: { title: string; body: string; signoff: string; image1: string; image2: string };
  founders: { image: string; caption: string };
  menu: { coffee: MenuItem[]; desserts: MenuItem[]; drinks: MenuItem[] };
  gallery: string[];
  reservation: { outMax: number; inMax: number; note: string };
  footer: { address: string; tagline: string };
};

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    kicker: "Karlštejn · č.p. 16",
    quote: "Zastavte se na babiččin koláč a poctivou kávu přímo na cestě na Karlštejn. Vše děláme ručně, pomalu a od srdce.",
    signature: "",
    cta: "Chci rezervovat místo",
    bgImage: img2345.url,
  },
  story: {
    title: "Dvě dámy, jeden sen.",
    body: "Pepina a Pavla otevřely Květinovou Kavárnu, aby vrátily kousek babiččiných časů zpátky pod karlštejnský kopec. Květované tapety, sametové polštáře, krajkové ubrousky a v každém šálku něco, co voní jako neděle.",
    signoff: "— S láskou, Pe & Pa",
    image1: img2349.url,
    image2: img2350.url,
  },
  founders: {
    image: founders.url,
    caption: "Pepina & Pavla · ve dveřích kavárny",
  },
  menu: {
    coffee: [
      { name: "Espresso", price: "55" },
      { name: "Lungo", price: "60" },
      { name: "Doppio", price: "75" },
      { name: "Macchiato", price: "65" },
      { name: "Cappuccino", price: "65" },
      { name: "Latte", price: "75" },
      { name: "Latte Macchiato", price: "75" },
      { name: "Flat White", price: "85" },
      { name: "Espresso Tonic", price: "70" },
    ],
    desserts: [
      { name: "Mošedaján", price: "79" },
      { name: "Rebarborovo-jahodový koláč", price: "69" },
      { name: "Švestkový koláč s mákem", price: "69" },
      { name: "Bábovka", price: "65" },
      { name: "Kávová bábovka", price: "65" },
    ],
    drinks: [
      { name: "Limonáda (borůvka, máta-citron, bezinková)", price: "45" },
      { name: "Plzeň 0,3", price: "60" },
      { name: "Víno 1dcl / 2dcl", price: "45 / 65" },
      { name: "Prosecco", price: "35" },
      { name: "Aperol Spritz", price: "125" },
    ],
  },
  gallery: [img2345.url, karlstejnStreet.url, img2349.url, img2350.url],
  reservation: {
    outMax: 32,
    inMax: 10,
    note: "Venku až 32 míst, uvnitř pro intimní chvíle 10 míst.",
  },
  footer: {
    address: "Karlštejn 16 · pod hradem · Česká republika",
    tagline: "otevřeno denně · order at bar · objednávky uvnitř",
  },
};

// ---- Reactive store ----
let current: SiteContent = DEFAULT_CONTENT;
const subs = new Set<() => void>();
let booted = false;

function emit() { subs.forEach((cb) => cb()); }

function mergeDeep<T>(base: T, partial: any): T {
  if (!partial || typeof partial !== "object" || Array.isArray(partial)) return (partial ?? base) as T;
  const out: any = Array.isArray(base) ? [...(base as any)] : { ...(base as any) };
  for (const k of Object.keys(partial)) {
    out[k] = mergeDeep((base as any)?.[k], partial[k]);
  }
  return out as T;
}

function boot() {
  if (booted || typeof window === "undefined") return;
  booted = true;
  // Listen for draft pushes from the admin parent window (live preview while editing)
  window.addEventListener("message", (e) => {
    if (e.data?.source === "pepa-admin" && e.data.type === "draft" && e.data.content) {
      current = mergeDeep(DEFAULT_CONTENT, e.data.content);
      emit();
    }
  });
}

function subscribe(cb: () => void) {
  subs.add(cb);
  boot();
  return () => { subs.delete(cb); };
}

export function useSiteContent(): SiteContent {
  return useSyncExternalStore(subscribe, () => current, () => DEFAULT_CONTENT);
}

export function getSiteContent(): SiteContent { return current; }

export async function saveSiteContent(c: SiteContent) {
  current = c;
  emit();
}

// Helper: set value at dot-path "hero.quote" or "menu.coffee.0.name"
export function setPath(obj: any, path: string, value: any): any {
  const keys = path.split(".");
  const root = Array.isArray(obj) ? [...obj] : { ...obj };
  let cur = root;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    const v = cur[k];
    cur[k] = Array.isArray(v) ? [...v] : { ...v };
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = value;
  return root;
}

export function getPath(obj: any, path: string): any {
  return path.split(".").reduce((a, k) => a?.[k], obj);
}
