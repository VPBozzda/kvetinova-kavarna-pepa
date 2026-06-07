import { useSyncExternalStore } from "react";

import img2342 from "@/assets/IMG_2342.asset.json";
import img2343 from "@/assets/IMG_2343.asset.json";
import img2345 from "@/assets/IMG_2345.asset.json";
import img2349 from "@/assets/IMG_2349.asset.json";
import img2350 from "@/assets/IMG_2350.asset.json";
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
    quote: "„Děláme to celé od srdce — protože to říkáme.“",
    signature: "Pepina & Pavla",
    cta: "Rezervovat stůl",
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
  gallery: [img2345.url, img2342.url, img2343.url, img2349.url, img2350.url],
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

const KEY = "pepa-site-content-v1";
const EVENT = "pepa-site-content-change";

function read(): SiteContent {
  if (typeof window === "undefined") return DEFAULT_CONTENT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_CONTENT;
    const parsed = JSON.parse(raw);
    // shallow merge to allow new defaults to surface
    return { ...DEFAULT_CONTENT, ...parsed };
  } catch {
    return DEFAULT_CONTENT;
  }
}

export function saveContent(c: SiteContent) {
  localStorage.setItem(KEY, JSON.stringify(c));
  window.dispatchEvent(new Event(EVENT));
}

export function resetContent() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useSiteContent(): SiteContent {
  return useSyncExternalStore(subscribe, read, () => DEFAULT_CONTENT);
}

export function getSiteContent(): SiteContent {
  return read();
}
