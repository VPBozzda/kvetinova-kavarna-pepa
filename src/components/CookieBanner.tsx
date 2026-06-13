import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const KEY = "pepa-cookies-ack";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {}
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-3xl rounded-lg border border-border bg-cream/95 px-4 py-3 shadow-lg backdrop-blur md:px-6">
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-sm leading-relaxed text-foreground">
          Tento web používá nezbytné cookies pro fungování rezervačního systému.{" "}
          <Link
            to="/ochrana-osobnich-udaju"
            className="underline decoration-rose underline-offset-2 hover:text-rose"
          >
            Více informací
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => {
              try { localStorage.setItem(KEY, "declined"); } catch {}
              setShow(false);
            }}
            className="rounded-md px-3 py-2 font-sans-ui text-xs uppercase tracking-[0.25em] text-muted-foreground transition hover:text-foreground"
          >
            Odmítnout
          </button>
          <button
            onClick={() => {
              try { localStorage.setItem(KEY, "1"); } catch {}
              setShow(false);
            }}
            className="rounded-md bg-primary px-5 py-2 font-sans-ui text-xs uppercase tracking-[0.25em] text-primary-foreground transition hover:bg-accent"
          >
            Rozumím
          </button>
        </div>
      </div>
    </div>
  );
}
